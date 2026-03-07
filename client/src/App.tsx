import { useState, useCallback } from 'react';

import { UI_SIDEBAR, VYAGUTA_AI_ROLES } from './constants';

import { Sidebar, ChatContainer } from './components';

import { useConversations, useQuickQuestions } from './hooks';

import { exportChatAsJson, countMessagesByRole } from './utils';

function App() {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    messages,
    isLoading,
    createNewChat,
    selectConversation,
    deleteConversation,
    renameConversation,
    clearConversation,
    sendMessage,
    getFilteredMessages,
  } = useConversations();

  const { quickQuestions, getSurpriseQuestion } = useQuickQuestions();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleExportChat = useCallback(() => {
    if (activeConversation) {
      exportChatAsJson(activeConversation);
    }
  }, [activeConversation]);

  const handleSurprise = useCallback(async () => {
    const question = await getSurpriseQuestion(messages.length);
    if (question) {
      sendMessage(question);
    }
  }, [getSurpriseQuestion, messages.length, sendMessage]);

  const filteredMessages = getFilteredMessages(searchTerm);

  const userMessageCount = countMessagesByRole(messages, VYAGUTA_AI_ROLES.USER);
  const assistantMessageCount = countMessagesByRole(
    messages,
    VYAGUTA_AI_ROLES.ASSISTANT,
  );

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onNewChat={createNewChat}
        onClearChat={clearConversation}
        onExportChat={handleExportChat}
        quickQuestions={quickQuestions}
        onQuickQuestion={sendMessage}
        messageCount={messages.length}
        userMessageCount={userMessageCount}
        assistantMessageCount={assistantMessageCount}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        onRenameConversation={renameConversation}
      />

      <ChatContainer
        messages={filteredMessages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
        onSurprise={handleSurprise}
        quickQuestions={quickQuestions}
        sidebarOpen={sidebarOpen}
        sidebarWidth={UI_SIDEBAR.SIDEBAR_WIDTH_DEFAULT}
      />
    </>
  );
}

export default App;
