import { FaGithub } from "react-icons/fa";
import {
  TbPlus,
  TbTrash,
  TbSearch,
  TbDownload,
  TbChevronLeft,
  TbExternalLink,
  TbGripVertical,
} from "react-icons/tb";

import type { QuickQuestion, ChatSession } from "../types";

import { APP, SIDEBAR, URLS, UI, STORAGE_KEYS } from "../constants";

import { Logo } from "./ui/Logo";
import { ConversationList } from "./ConversationList";

import { useResizable } from "../hooks";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNewChat: () => void;
  onClearChat: () => void;
  onExportChat: () => void;
  quickQuestions: QuickQuestion[];
  onQuickQuestion: (question: string) => void;
  messageCount: number;
  userMessageCount: number;
  assistantMessageCount: number;
  conversations: ChatSession[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, name: string) => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  searchTerm,
  onSearchChange,
  onNewChat,
  onClearChat,
  onExportChat,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
}: SidebarProps) {
  const { width, isResizing, startResize } = useResizable({
    minWidth: UI.SIDEBAR_WIDTH_MIN,
    maxWidth: UI.SIDEBAR_WIDTH_MAX,
    defaultWidth: UI.SIDEBAR_WIDTH_DEFAULT,
    storageKey: STORAGE_KEYS.SIDEBAR_STATE + "_width",
  });

  return (
    <aside
      style={{ width: isOpen ? width : 0 }}
      className={`fixed z-50 flex-shrink-0 h-screen backdrop-blur border-r border-white/10 flex flex-col transition-[width] duration-300 overflow-hidden ${isResizing ? "transition-none" : ""}`}
    >
      {/* Resize Handle */}
      {/* TODO: update the colors here */}
      {isOpen && (
        <div
          onMouseDown={startResize}
          className={`absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize group hover:bg-vyaguta-primary/50 transition-colors z-50 ${isResizing ? "bg-vyaguta-primary" : ""}`}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <TbGripVertical />
          </div>
        </div>
      )}
      <div
        className="flex-1 flex flex-col"
        style={{ minWidth: UI.SIDEBAR_WIDTH_MIN }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Logo />
            <button
              onClick={onToggle}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <TbChevronLeft className="text-xl" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={SIDEBAR.SEARCH_PLACEHOLDER}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vyaguta-primary/50 focus:border-vyaguta-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-2">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-vyaguta-primary to-vyaguta-secondary hover:opacity-90 rounded-lg transition-all text-sm"
          >
            <TbPlus />
            {SIDEBAR.NEW_CHAT}
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClearChat}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
            >
              <TbTrash />
              {SIDEBAR.CLEAR}
            </button>
            <button
              onClick={onExportChat}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm"
            >
              <TbDownload />
              {SIDEBAR.EXPORT}
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider">
              {SIDEBAR.CONVERSATIONS}
            </h3>
            <span className="text-xs text-gray-500">
              {conversations.length}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={onSelectConversation}
            onDeleteConversation={onDeleteConversation}
            onRenameConversation={onRenameConversation}
          />
        </div>

        {/* Quick Links */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-xs">{SIDEBAR.QUICK_LINKS}</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href={URLS.VYAGUTA_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-vyaguta-primary transition-colors"
            >
              <TbExternalLink />
              <span>{SIDEBAR.PORTAL}</span>
            </a>
            <span className="text-gray-600">•</span>
            <a
              href={URLS.WIKI}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-vyaguta-primary transition-colors"
            >
              <TbExternalLink />
              <span>{SIDEBAR.WIKI}</span>
            </a>
            <span className="text-gray-600">•</span>
            <a
              href={URLS.SLACK_HELP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-vyaguta-primary transition-colors"
            >
              <TbExternalLink />
              <span>{SIDEBAR.HELP}</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-gray-500">
            <p>{APP.COPYRIGHT}</p>
            <div className="flex items-center justify-start gap-3 mt-2">
              <span className="text-gray-500">{APP.VERSION}</span>
              <a
                href={URLS.GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
              >
                <FaGithub />
                <span>{SIDEBAR.GITHUB}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
