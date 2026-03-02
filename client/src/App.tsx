import { useState, useCallback } from "react";
import { Sidebar, ChatContainer } from "./components";
import { useConversations, useQuickQuestions } from "./hooks";
import { exportChatAsJson, countMessagesByRole } from "./utils";

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
  const [searchTerm, setSearchTerm] = useState("");

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

  // TODO: make the enums for the role
  const userMessageCount = countMessagesByRole(messages, "user");
  const assistantMessageCount = countMessagesByRole(messages, "assistant");

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
        onToggleSidebar={toggleSidebar}
      />
    </>
  );
}

export default App;
