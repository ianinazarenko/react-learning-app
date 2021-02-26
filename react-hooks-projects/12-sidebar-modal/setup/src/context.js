import React, { useState, useContext } from "react";

const AppContext = React.createContext();

function AppProvider(props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { children } = props;

    return (
        <AppContext.Provider
            value={{
                isModalOpen,
                isSidebarOpen,
                openModal,
                openSidebar,
                closeModal,
                closeSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

function useGlobalContext() {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
