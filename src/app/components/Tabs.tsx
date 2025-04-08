const Tabs = ({ tabs, activeTab, setActiveTab }: { tabs: string[]; activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className="flex bg-[#fbfbfb] border-b my-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-gray-500 text-sm hover:text-gray-800 focus:text-black transition-all ${
            activeTab === tab ? "font-semibold text-sm bg-white shadow rounded-md text-black" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default Tabs
