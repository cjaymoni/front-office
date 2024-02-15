import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Link } from "react-router-dom";

export const BreadCrumbComponent = () => {
  const getPathnameSegments = () => {
    const pathname = window.location.pathname.split("/").filter(Boolean);
    return pathname.length > 0 ? pathname : [""];
  };

  const hashUrl = (segments) => {
    // Hash the segments to form a concatenated URL
    const hashedUrl = segments.reduce(
      (url, segment) => `${url}/${segment}`,
      ""
    );
    return hashedUrl;
  };

  // const constructBreadcrumbs = () => {
  //   const pathnameSegments = getPathnameSegments();

  //   // Check if the last segment is 'edit'
  //   if (
  //     pathnameSegments.length > 1 &&
  //     pathnameSegments[pathnameSegments.length - 1] === "edit"
  //   ) {
  //     const selectedIndex = pathnameSegments.length - 2;

  //     // Replace the item before 'edit' with the selected item
  //     const updatedItems = [...pathnameSegments];
  //     updatedItems.splice(selectedIndex, 1, "SelectedItem");

  //     return updatedItems.map((segment, index) => {
  //       if (segment === "SelectedItem") {
  //         const object1Url = hashUrl(pathnameSegments.slice(0, selectedIndex));
  //         const url = `${object1Url}/SelectedObject`;
  //         return {
  //           label: "SelectedItem",
  //           url,
  //           key: `SelectedItem-${index}`,
  //           object: { name: "Selected Object", id: selectedIndex }, // Add an object associated with the selected item
  //         };
  //       }
  //       const object1Url = hashUrl(pathnameSegments.slice(0, index + 1));
  //       const url = `${object1Url}/${segment}`;
  //       return {
  //         label: segment,
  //         url,
  //         key: `${segment}-${index}`,
  //         object: null, // For non-selected items, add null or an appropriate object
  //       };
  //     });
  //   }

  //   return pathnameSegments.map((segment, index) => {
  //     const object1Url = hashUrl(pathnameSegments.slice(0, index + 1));
  //     const url = `${object1Url}/${segment}`;
  //     return {
  //       label: segment,
  //       url,
  //       key: `${segment}-${index}`,
  //       object: null, // For non-selected items, add null or an appropriate object
  //     };
  //   });
  // };

  const iconItemTemplate = (item, options) => {
    return (
      <Link to={item.url} className="text-black">
        {item.label}
      </Link>
      //  <a className={options.className}>
      //    <span className={item.icon}></span>
      //  </a>
    );
  };

  const constructBreadcrumbs = () => {
    const pathnameSegments = getPathnameSegments();

    return pathnameSegments.map((segment, index) => {
      // Check if the segment is a UUID
      const isUUID = segment.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );

      // Use a meaningful string instead of the UUID for display
      const label = isUUID ? "Selected Lead" : segment;

      const urlSegments = pathnameSegments.slice(0, index + 1);
      const url = `/${urlSegments.join("/")}`;

      return {
        label,
        url,
        key: `${label}-${index}`,
        object: null,
        template: iconItemTemplate,
      };
    });
  };

  const items = constructBreadcrumbs();
  const home = { icon: "pi pi-home", url: "/dashboard" };
  // console.log(items);

  return (
    <div className="capitalize">
      <BreadCrumb
        model={items}
        home={home}
        separatorIcon={<i className="pi pi-angle-right text-black" />}
      />
    </div>
  );
};
