/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// Steph - this directive is how we tell React that this is a client component
'use client';

import {useState, useRef, useEffect, useTransition} from 'react';
import {useRouter} from './framework/router';

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}) {
  // Steph - Note that this needs to be a client component because it is using hooks (e.g. `useState`)
  const {location, navigate} = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === location.selectedId;

  // Animate after title is edited.
  const itemRef = useRef(null);
  const prevTitleRef = useRef(title);
  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current.classList.add('flash');
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current.classList.remove('flash');
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : '',
      ].join(' ')}>
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
            ? 'var(--tertiary-blue)'
            : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          startTransition(() => {
            navigate({
              selectedId: id,
              isEditing: false,
            });
          });
        }}>
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <img
            src="chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {/* However, we can display render content from the server INSIDE a client component
      by passing it via a property */}
      {isExpanded && expandedChildren}
    </div>
  );
}
