import { createContext, PropsWithChildren, useContext, useState } from "react";
import cn from "classnames";

export default function Tabs({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col">{children}</div>
    </TabContext.Provider>
  );
}

const TabContext = createContext({
  activeTab: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActiveTab: (_: number) => {},
});

export function TabList({ children }: PropsWithChildren) {
  return <div className="flex gap-x-20 justify-center">{children}</div>;
}

export function Tab({ children, index }: PropsWithChildren<{ index: number }>) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  return (
    <button
      className={cn("border-b-3 p-14", {
        "text-main border-main": activeTab === index,
        "border-transparent text-gray-500": activeTab !== index,
      })}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children }: PropsWithChildren) {
  // 부모 플렉스박스의 나머지를, 다 차지하도록 함 Flex 1 1 0
  return <div className="flex-1">{children}</div>;
}

export function TabPanel({
  children,
  index,
}: PropsWithChildren<{ index: number }>) {
  const { activeTab } = useContext(TabContext);
  /* 탭이 액티브하지 않을떄 안보이는게 브라우저 성능에 더 좋음, */
  return <div hidden={index !== activeTab}>{children}</div>;
}
