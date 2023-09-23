/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import SidebarNoteContent from './SidebarNoteContent';
import SidebarNoteHeader from './SidebarNoteHeader';
import SidebarNoteExcerpt from './SidebarNoteExcerpt';

export default function SidebarNote({note}) {
  return (
    <SidebarNoteContent
      id={note.id}
      title={note.title}
      // Steph - You can't render a Server Component as a direct child of a Client Component
      // But you can pass a React Node containing a Server Component as a property instead!
      expandedChildren={<SidebarNoteExcerpt body={note.body} />}>
      <SidebarNoteHeader
        note={note}
        myFunction={() => console.log('Hello world!')}
      />
    </SidebarNoteContent>
  );
}
