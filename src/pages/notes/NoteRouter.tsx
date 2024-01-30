import { Route } from "react-router-dom";
import NoteList from "./components/NoteList";
import ROUTES from "../../consts/routes";
import EditorNote from "./EditorNote";

const NoteRouter = (
  <>
    <Route path="" element={<NoteList />} />
    <Route path={ROUTES.NOTES.EDITOR} element={<EditorNote />} />
  </>
);

export default NoteRouter;
