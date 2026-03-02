import { MessageSquare, Trash2, Edit2, Check, X } from "lucide-react";
import { useState, useCallback } from "react";
import type { ChatSession } from "../types";
import { formatRelativeDate } from "../utils";
import { CONVERSATION } from "../constants";

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
  const [editName, setEditName] = useState("");

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
    setEditName("");
  }, []);

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>{CONVERSATION.NO_CONVERSATIONS}</p>
        <p className="text-xs mt-1">{CONVERSATION.START_NEW}</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
            activeConversationId === conversation.id
              ? "bg-vyaguta-primary/20 border border-vyaguta-primary/30"
              : "hover:bg-white/5 border border-transparent"
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <MessageSquare
            className={`w-4 h-4 flex-shrink-0 ${
              activeConversationId === conversation.id
                ? "text-vyaguta-primary"
                : "text-gray-500"
            }`}
          />

          {editingId === conversation.id ? (
            <div className="flex-1 flex items-center gap-1">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(conversation.id);
                  if (e.key === "Escape") cancelEdit();
                }}
                className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-vyaguta-primary"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  saveEdit(conversation.id);
                }}
                className="p-1 hover:bg-white/10 rounded"
              >
                <Check className="w-3 h-3 text-green-400" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cancelEdit();
                }}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {conversation.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {conversation.messages.length} {CONVERSATION.MESSAGES_LABEL} •{" "}
                  {formatRelativeDate(conversation.updatedAt)}
                </p>
              </div>

              <div className="hidden group-hover:flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(conversation);
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  title={CONVERSATION.RENAME}
                >
                  <Edit2 className="w-3 h-3 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  title={CONVERSATION.DELETE}
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
