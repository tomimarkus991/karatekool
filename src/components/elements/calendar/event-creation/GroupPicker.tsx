import { Combobox } from "@headlessui/react";
import { useState } from "react";

import { useGetGroups } from "@/hooks";

export const GroupPicker = () => {
  const [selectedGroup, setSelectedGroup] = useState<any>();

  const { data } = useGetGroups();

  if (!data) return null;

  const { groups, highlightedGroups } = data;

  if (!groups || !highlightedGroups) return null;

  return (
    <Combobox multiple={true} value={selectedGroup} onChange={setSelectedGroup}>
      {/* <Combobox.Input  /> */}
      <Combobox.Options>
        {groups.map(group => (
          <Combobox.Option key={group} value={group}>
            {group}
          </Combobox.Option>
        ))}
        {highlightedGroups.map(highlightedGroup => (
          <Combobox.Option key={highlightedGroup} value={highlightedGroup}>
            {highlightedGroup}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
