import React from "react";
import { Checkbox } from "./checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { CheckedState } from "@radix-ui/react-checkbox";

const SelectContainer = ({
  data = [],
  title = "",
  placeholder = "",
  onSelect,
  target,
  refData,
  defaultValues = [],
}: {
  title: string;
  placeholder: string;
  data: string[];
  refData?: any;
  onSelect: Function;
  target: "language" | "teachers" | "modules";
  defaultValues?: string[];
}) => {
  const [state, setState] = React.useState<string[]>([]);

  const onClick = (value: string) => (checkedState: CheckedState) => {
    if (checkedState)
      setState((prevState: string[]) => {
        const newData = Array.from(new Set([...prevState, value]));
        onSelect(newData, target);
        return newData;
      });
    else {
      setState((prevState: string[]) => {
        const filteredArr = prevState.filter((v: string) => v !== value);
        onSelect(filteredArr, target);
        return [...filteredArr];
      });
    }
  };

  const Languages = refData
    ? refData.map((d: any, index: number) => {
        return (
          <div key={index} className="w-full items-center">
            <Checkbox
              checked={state.includes(d.id)}
              onCheckedChange={onClick(d.id)}
              className="mx-2"
            />
            <span>{d.title}</span>
          </div>
        );
      })
    : data.map((d: string, index: number) => {
        return (
          <div key={index} className="w-full items-center">
            <Checkbox
              checked={state.includes(d)}
              onCheckedChange={onClick(d)}
              className="mx-2"
            />
            <span>{d}</span>
          </div>
        );
      });

  React.useEffect(() => {
    if (defaultValues) setState(defaultValues);
  }, [defaultValues]);

  return (
    <Select>
      <SelectTrigger className="w-2/3 h-[30px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="min-h-[100px] max-h-[250px]">
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {Languages}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectContainer;
