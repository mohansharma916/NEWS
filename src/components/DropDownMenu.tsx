import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function DropDownMenu({
  title,
  data,
  value,
  onChange,
}: {
  title: string;
  data: { id: number; name: string; value: string }[];
  value: { id: number; name: string; value: string };
  onChange: (value: { id: number; name: string; value: string }) => void;
}) {
  return (
    <div className="fle-col flex w-full flex-col space-y-2 bg-white">
      <h6 className="text-sm font-semibold">{title}</h6>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg border bg-white py-2 pl-3 pr-8 text-left text-xs text-black md:border-2 md:text-sm",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-200",
          )}
        >
          {value.name}
          <ChevronDownIcon
            className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-black"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "z-40 w-[var(--button-width)] rounded-xl border border-gray-100 bg-gray-100 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {data.map((person) => (
            <ListboxOption
              key={person.name}
              value={person}
              className="group flex cursor-pointer select-none items-center gap-2 rounded-lg p-3 data-[focus]:bg-gray-200"
            >
              <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="whitespace-nowrap text-xs text-black md:text-sm">
                {person.name}
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
