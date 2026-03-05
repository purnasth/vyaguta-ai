import { useState, useCallback } from 'react';
import { LuMessageSquareShare } from 'react-icons/lu';
import { TbCheck, TbPencil, TbTrash, TbX } from 'react-icons/tb';

import { CONVERSATION } from '../constants';
import type { ChatSession } from '../types';

import { formatRelativeDate } from '../utils';

interface ConversationListProps {
  conversations: ChatSession[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, name: string) => void;
}

export function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
}: ConversationListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEditing = useCallback((conversation: ChatSession) => {
    setEditingId(conversation.id);
    setEditName(conversation.name);
  }, []);

  const saveEdit = useCallback(
    (id: string) => {
      if (editName.trim()) {
        onRenameConversation(id, editName.trim());
      }
      setEditingId(null);
    },
    [editName, onRenameConversation],
  );

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditName('');
  }, []);

  if (conversations.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">
        <LuMessageSquareShare className="mx-auto mb-2 text-5xl opacity-50" />
        <p className="mx-auto max-w-36 text-xs">
          {CONVERSATION.NO_CONVERSATIONS}. {CONVERSATION.START_NEW}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`group relative flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 ${
            activeConversationId === conversation.id
              ? 'border-white/10 bg-white/5'
              : 'border-transparent opacity-60 hover:bg-white/5 hover:opacity-90'
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <LuMessageSquareShare
            className={`shrink-0 text-lg ${
              activeConversationId === conversation.id
                ? 'opacity-100'
                : 'opacity-40'
            }`}
          />

          {editingId === conversation.id ? (
            <div className="flex flex-1 items-center">
              {/* TODO: work on validation and max chars */}
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEdit(conversation.id);
                  if (e.key === 'Escape') cancelEdit();
                }}
                className="focus:ring-vyaguta-primary flex-1 rounded border border-white/20 bg-white/10 px-1 py-0.5 text-xs focus:ring-1 focus:ring-white/50 focus:outline-none"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  saveEdit(conversation.id);
                }}
                className="rounded p-1 hover:bg-white/10"
              >
                <TbCheck className="text-sm text-green-500" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cancelEdit();
                }}
                className="rounded p-1 hover:bg-white/10"
              >
                <TbX className="text-sm text-red-500" />
              </button>
            </div>
          ) : (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">
                  {conversation.name}
                </p>
                <p className="text-xxs truncate text-gray-500">
                  {conversation.messages.length} {CONVERSATION.MESSAGES_LABEL} •{' '}
                  {formatRelativeDate(conversation.updatedAt)}
                </p>
              </div>

              <div className="hidden items-center gap-1 group-hover:flex">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(conversation);
                  }}
                  className="rounded p-1 transition-colors hover:bg-white/10"
                  title={CONVERSATION.RENAME}
                >
                  <TbPencil className="text-sm text-gray-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                  className="rounded p-1 transition-colors hover:bg-white/10"
                  title={CONVERSATION.DELETE}
                >
                  <TbTrash className="text-sm text-red-500" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
