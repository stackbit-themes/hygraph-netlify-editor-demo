import React from "react";
import { getComponentForName } from "@/helpers";

export default function ComponentRenderer({ data }: any) {
  return (
    <>
      {data.map((component: any) => {
        const Component = getComponentForName(component.__typename);
        return React.createElement(Component, {
          key: component.id,
          ...component,
        });
      })}
    </>
  );
}
