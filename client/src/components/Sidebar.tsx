import {
  TbPlus,
  TbMenu2,
  TbTrash,
  TbSearch,
  TbDownload,
  TbChevronLeft,
  TbExternalLink,
} from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

import type { QuickQuestion, ChatSession } from '../types';

import { APP, SIDEBAR, URLS, UI_SIDEBAR, STORAGE_KEYS } from '../constants';

import { Logo } from './ui';
import { ConversationList } from './index';

import { useResizable } from '../hooks';

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
    minWidth: UI_SIDEBAR.SIDEBAR_WIDTH_MIN,
    maxWidth: UI_SIDEBAR.SIDEBAR_WIDTH_MAX,
    defaultWidth: UI_SIDEBAR.SIDEBAR_WIDTH_DEFAULT,
    storageKey: STORAGE_KEYS.SIDEBAR_STATE + '_width',
  });

  return (
    <>
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 rounded-lg p-2 shadow-[inset_0_3px_8px_rgba(255,255,255,0.1)] backdrop-blur-xs transition-colors hover:bg-white/10"
          aria-label="Open sidebar"
        >
          <TbMenu2 className="text-xl" />
        </button>
      )}

      <aside
        style={{ width: isOpen ? width : 0 }}
        className={`fixed z-50 flex h-screen shrink-0 flex-col overflow-hidden overflow-y-auto border-r border-white/10 backdrop-blur ${isResizing ? 'transition-none' : ''}`}
      >
        {isOpen && (
          <div
            onMouseDown={startResize}
            className={`group hover:bg-vyaguta-green absolute top-0 right-0 bottom-0 z-50 w-0.5 cursor-ew-resize transition-colors ${isResizing ? 'bg-vyaguta-green/25' : ''}`}
          ></div>
        )}
        <div
          className="flex flex-1 flex-col gap-6 p-4"
          style={{ minWidth: UI_SIDEBAR.SIDEBAR_WIDTH_MIN }}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={onToggle}
              className="rounded-lg bg-white/5 p-2 shadow-[inset_0_3px_8px_rgba(255,255,255,0.1)] transition-colors hover:bg-white/10"
            >
              <TbChevronLeft className="text-xl" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <TbSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-white" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={SIDEBAR.SEARCH_PLACEHOLDER}
                className="bg-dark/10 w-full rounded-lg border border-white/5 py-3 pr-4 pl-9 text-sm placeholder-white focus:border-white/30 focus:outline-none"
              />
            </div>

            <button
              onClick={onNewChat}
              className="bg-vyaguta-blue flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm hover:opacity-90"
            >
              <TbPlus />
              {SIDEBAR.NEW_CHAT}
            </button>

            <div className="flex gap-2">
              <button
                onClick={onClearChat}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <TbTrash />
                {SIDEBAR.CLEAR}
              </button>
              <button
                onClick={onExportChat}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <TbDownload />
                {SIDEBAR.EXPORT}
              </button>
            </div>
          </div>

          <hr className="border-white/10" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-light tracking-wider text-gray-400 uppercase">
                {SIDEBAR.CONVERSATIONS}
              </h3>
              <span className="text-xs text-gray-400">
                {conversations.length}
              </span>
            </div>
          </div>
          <div className="max-h-[50vh] min-h-0 flex-1 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={onSelectConversation}
              onDeleteConversation={onDeleteConversation}
              onRenameConversation={onRenameConversation}
            />
          </div>

          <hr className="border-white/10" />

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-medium">{SIDEBAR.QUICK_LINKS}</h3>
              </div>
              {/* TODO: map quick links */}
              <div className="flex flex-wrap gap-3 text-xs">
                <Link
                  to={URLS.VYAGUTA_PORTAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 transition-colors hover:text-white"
                >
                  <TbExternalLink />
                  <span>{SIDEBAR.PORTAL}</span>
                </Link>
                <Link
                  to={URLS.WIKI}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 transition-colors hover:text-white"
                >
                  <TbExternalLink />
                  <span>{SIDEBAR.WIKI}</span>
                </Link>
                <Link
                  to={URLS.SLACK_HELP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-400 transition-colors hover:text-white"
                >
                  <TbExternalLink />
                  <span>{SIDEBAR.HELP}</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-start gap-6 text-xs text-gray-400">
              <p>&copy; {APP.VERSION}</p>
              <a
                href={URLS.GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                <FaGithub />
                <span>{SIDEBAR.GITHUB}</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
