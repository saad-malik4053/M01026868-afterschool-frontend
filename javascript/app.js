const { createApp } = Vue;

createApp({

  data() {
    return {
      lessons: [],
      cart: [],
      showCart: false,
      sortBy: 'topic',
      sortOrder: 'asc',
      loading: true,

      name: '',
      phone: '',
      orderMessage: '',
      orderSuccess: false,

      searchTerm: '',

      teachers: [],
      selectedTeacherId: '',

      enrolment: {},
      showEnrolment: {}
    };
  },

  computed: {

    displayLessons() {
      const cartCounts = {};
      this.cart.forEach(item => {
        cartCounts[item.originalId] = (cartCounts[item.originalId] || 0) + 1;
      });

      return this.lessons.map(lesson => ({
        ...lesson,
        space: Math.max(0, lesson.space - (cartCounts[lesson.id] || 0))
      }));
    },

    sortedLessons() {
      const lessons = [...this.displayLessons];
      const attr = this.sortBy;
      const dir = this.sortOrder === 'asc' ? 1 : -1;

      return lessons.sort((a, b) => {
        let valA = a[attr];
        let valB = b[attr];

        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        if (valA < valB) return -1 * dir;
        if (valA > valB) return 1 * dir;
        return 0;
      });
    },

    cartTotal() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },

    nameIsValid() {
      return /^[A-Za-z]+$/.test(this.name);
    },

    phoneIsValid() {
      return /^[0-9]{10,}$/.test(this.phone);
    },

    phoneError() {
      if (!this.phone) return '';
      if (!/^[0-9]+$/.test(this.phone)) {
        return 'Phone must contain numbers only.';
      }
      if (this.phone.length < 10) {
        return 'Phone must contain at least 10 digits.';
      }
      return '';
    },

    isCheckoutValid() {
      return this.nameIsValid && this.phoneIsValid;
    }
  },

  methods: {

    loadLessons() {
      this.loading = true;
      getLessons()
        .then(data => {
          this.lessons = data;
          this.loading = false;
        })
        .catch(err => {
          console.warn('Back-end unavailable — using local data.', err);
          this.lessons = LOCAL_LESSONS.map(l => ({ ...l }));
          this.loading = false;
        });
    },

    performSearch() {
      const term = this.searchTerm.trim();
      if (!term) { this.clearSearch(); return; }

      this.selectedTeacherId = '';
      this.loading = true;

      searchLessons(term)
        .then(data => {
          this.lessons = data;
          this.loading = false;
        })
        .catch(err => {
          console.warn('Back-end search unavailable — filtering locally.', err);
          const t = term.toLowerCase();
          this.lessons = LOCAL_LESSONS.filter(l =>
            l.topic.toLowerCase().includes(t) ||
            l.location.toLowerCase().includes(t) ||
            String(l.price).includes(t) ||
            String(l.space).includes(t)
          );
          this.loading = false;
        });
    },

    clearSearch() {
      this.searchTerm = '';
      this.loadLessons();
    },

    loadTeachers() {
      getTeachers()
        .then(data => { this.teachers = data; })
        .catch(err => console.warn('Could not load teachers.', err));
    },

    onTeacherChange() {
      if (!this.selectedTeacherId) {
        this.loadLessons();
        return;
      }
      this.searchTerm = '';
      this.loading = true;

      getTeacherLessons(this.selectedTeacherId)
        .then(data => {
          this.lessons = data;
          this.loading = false;
        })
        .catch(err => {
          console.error('Teacher filter failed.', err);
          this.lessons = [];
          this.loading = false;
        });
    },

    toggleEnrolment(lessonId) {
      if (this.showEnrolment[lessonId]) {
        this.showEnrolment[lessonId] = false;
        return;
      }
      this.showEnrolment[lessonId] = true;
      getEnrolment(lessonId)
        .then(data => { this.enrolment[lessonId] = data.enrolment; })
        .catch(err => {
          console.warn(`Enrolment fetch failed for ${lessonId}.`, err);
          this.enrolment[lessonId] = 'N/A';
        });
    },

    addToCart(lesson) {
      this.orderMessage = '';
      if (lesson.space > 0) {
        const alreadyInCart = this.cart.filter(i => i.originalId === lesson.id).length;
        const rawSpace = lesson.space + alreadyInCart;

        this.cart.push({
          originalId: lesson.id,
          topic:      lesson.topic,
          location:   lesson.location,
          price:      lesson.price,
          icon:       lesson.icon,
          spaceAtAdd: rawSpace
        });
      }
    },

    removeFromCart(index) {
      this.cart.splice(index, 1);
    },

    toggleCart() {
      this.showCart = !this.showCart;
    },

    checkout() {
      const lessonMap = {};
      this.cart.forEach(item => {
        lessonMap[item.originalId] = (lessonMap[item.originalId] || 0) + 1;
      });

      const lessons   = Object.entries(lessonMap).map(([lessonId, quantity]) => ({
        lessonId, quantity
      }));
      const lessonIds = Object.keys(lessonMap);
      const spaces    = this.cart.length;

      const order = {
        name:      this.name,
        phone:     this.phone,
        lessonIds,
        spaces,
        lessons
      };

      const spaceSnapshots = {};
      this.cart.forEach(item => {
        if (!(item.originalId in spaceSnapshots)) {
          spaceSnapshots[item.originalId] = item.spaceAtAdd;
        }
      });

      saveOrder(order)
        .then(() => Promise.all(
          lessonIds.map(id => {
            const raw = spaceSnapshots[id];
            const qty = lessonMap[id];
            return updateLessonSpace(id, Math.max(0, raw - qty));
          })
        ))
        .then(() => {
          this.orderSuccess = true;
          this.orderMessage = `Order submitted successfully! Thank you, ${this.name}.`;

          this.cart              = [];
          this.name              = '';
          this.phone             = '';
          this.showCart          = false;
          this.selectedTeacherId = '';
          this.searchTerm        = '';

          this.loadLessons();
        })
        .catch(err => {
          console.error('Checkout failed:', err);
          this.orderSuccess = false;
          this.orderMessage = 'There was a problem submitting your order. Please try again.';
        });
    }
  },

  mounted() {
    this.loadLessons();
    this.loadTeachers();
  }

}).mount('#app');