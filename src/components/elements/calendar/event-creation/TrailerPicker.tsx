import { Combobox } from "@headlessui/react";
import { useState } from "react";

import { useGetTrailers } from "@/hooks";

/**
 *
 * only one can be selected for a given event
 */
export const TrailerPicker = () => {
  const [selectedTrailer, setSelectedTrailer] = useState();

  const { data } = useGetTrailers();

  if (!data) return null;

  return (
    <Combobox value={selectedTrailer} onChange={setSelectedTrailer}>
      {/* <Combobox.Input  /> */}
      <Combobox.Options>
        {data.map(trailer => (
          <Combobox.Option key={trailer} value={trailer}>
            {trailer}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
