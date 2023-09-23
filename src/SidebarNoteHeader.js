import {format, isToday} from 'date-fns';

export default function SidebarNoteHeader({note}) {
  // Steph - Server components serialize to a format similar to JSON
  // Therefore, you cannot use JS Dates as properties, either directly or via objects.
  // Instead, you can pass dates as a string in the JSON date format
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
