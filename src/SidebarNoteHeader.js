import {format, isToday} from 'date-fns';

export default function SidebarNoteHeader({note}) {
  const updatedAt = new Date(note.updated_at);
  const lastUpdatedAt = isToday(updatedAt)
    ? format(updatedAt, 'h:mm bb')
    : format(updatedAt, 'dd/MM/yy');

  return (
    <header className="sidebar-note-header">
      <strong>{note.title}</strong>
      <small>{lastUpdatedAt}</small>
    </header>
  );
}
