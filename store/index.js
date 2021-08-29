export const state = () => ({
  locale: "ru",
  locales: ["en", "ru", 'kz']
});

export const mutations = {
  setLanguage(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      localStorage.setItem("lang",locale);
      state.locale = locale;
    }
  }
};
export const getters = {
  currentState(state){
    if(localStorage.getItem("lang") !== null && state.locales.includes(localStorage.getItem("lang"))){
      state.locale = localStorage.getItem("lang");
      return state.locale
    }
    else{
      return state.locale;
    }
  }
}

export const strict = false
