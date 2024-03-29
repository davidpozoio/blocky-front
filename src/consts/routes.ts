const ROUTES = {
  HOME: {
    ME: "/home",
  },
  AUTH: {
    ME: "/auth",
    get LOGIN() {
      return `${this.ME}/login`;
    },
    get SIGNUP() {
      return `${this.ME}/signup`;
    },
  },
  NOTES: {
    ME: "/notes",
    get TRASH() {
      return `${this.ME}/trash`;
    },
    get EDITOR() {
      return `${this.ME}/:id`;
    },
    EDITORID(noteId: number) {
      return `${this.ME}/${noteId}`;
    },
    get CREATE() {
      return `${this.ME}/create`;
    },
  },
};

export default ROUTES;
