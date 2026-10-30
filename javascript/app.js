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

}).mount('#app');