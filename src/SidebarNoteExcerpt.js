// Steph - we can see that the `excerpts` import is quite hefty!
// But by using it in a server component, we don't need to add it to the bundle!
import excerpts from 'excerpts';
import {marked} from 'marked';

export default function SidebarNoteExcerpt({body, myFunction}) {
  const summary = excerpts(marked(body), {words: 20});

  // Steph - Server components serialize to a format similar to JSON
  // You cannot pass functions as properties because they are not serializable
  // Also note that this console log will appear in the server console, not the browser console
  console.log(`myFunction value: `, myFunction);

  return (
    <p className="sidebar-note-excerpt">{summary || <i>(No content)</i>}</p>
  );
}
