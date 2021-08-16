export default function ({app:{i18n},store}) {
  i18n.locale = store.getters.currentState;
}
