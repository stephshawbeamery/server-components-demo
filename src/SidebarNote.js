/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// Steph - we can see that the `excerpts` import is quite hefty!
// But by using it in a server component, we don't need to add it to the bundle!
import excerpts from 'excerpts';
import {marked} from 'marked';

import SidebarNoteContent from './SidebarNoteContent';
import SidebarNoteHeader from './SidebarNoteHeader';

export default function SidebarNote({note}) {
  const summary = excerpts(marked(note.body), {words: 20});

  return (
    <SidebarNoteContent
      id={note.id}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">{summary || <i>(No content)</i>}</p>
      }>
      <SidebarNoteHeader note={note} />
    </SidebarNoteContent>
  );
}
