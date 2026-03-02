/**
 * Main Application Component
 *
 * Clean separation of concerns using custom hooks and utilities.
 */

import { useState, useCallback } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChatContainer } from "./components/ChatContainer";
import { useConversations, useQuickQuestions } from "./hooks";
import { exportChatAsJson, countMessagesByRole } from "./utils";

function App() {
  // Conversation management
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

  // Quick questions
  const { quickQuestions, getSurpriseQuestion } = useQuickQuestions();

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Export current chat
  const handleExportChat = useCallback(() => {
    if (activeConversation) {
      exportChatAsJson(activeConversation);
    }
  }, [activeConversation]);

  // Handle surprise question
  const handleSurprise = useCallback(async () => {
    const question = await getSurpriseQuestion(messages.length);
    if (question) {
      sendMessage(question);
    }
  }, [getSurpriseQuestion, messages.length, sendMessage]);

  // Filtered messages based on search
  const filteredMessages = getFilteredMessages(searchTerm);

  // Message counts
  const userMessageCount = countMessagesByRole(messages, "user");
  const assistantMessageCount = countMessagesByRole(messages, "assistant");

  return (
    <div className="flex h-screen overflow-hidden">
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
        onToggleSidebar={toggleSidebar}
      />
    </div>
  );
}

export default App;
