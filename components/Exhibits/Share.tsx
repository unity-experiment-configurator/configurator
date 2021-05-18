import { useState } from "react";
import CopyText from "../CopyText";
import Alert from "../Alert";

type Role = "editor" | "viewer";

type Action = {
  url: string;
  verb: string;
};

type RoleAction = [Role, Action];

type Size = {
  width: number;
  height: number;
};

const sizes: Size[] = [
  {
    width: 640,
    height: 480,
  },
  {
    width: 800,
    height: 600,
  },
  {
    width: 1024,
    height: 768,
  },
];

const Share = ({
  exhibitId,
  publicId,
}: {
  exhibitId: string;
  publicId: string;
}) => {
  const baseURL: URL = new URL(document.location.href);

  const roles = new Map<Role, Action>();

  roles.set("editor", {
    url: `${baseURL.origin}/exhibits/edit/${exhibitId}`,
    verb: "edit",
  });

  roles.set("viewer", {
    url: `${baseURL.origin}/exhibits/${publicId}`,
    verb: "view",
  });

  const [role, setRole] = useState<Role>("editor");
  const [size, setSize] = useState<Size>(sizes[0]);

  const urlToCopy = () => {
    return roles.get(role)!.url;
  };

  const embedCodeToCopy = () => {
    return `<iframe src="${roles.get("viewer")!.url}?embedded=true" width="${
      size.width
    }" height="${size.height}" allowfullscreen frameborder="0"></iframe>`;
  };

  return (
    <div
      style={{
        minWidth: "50vw",
      }}
    >
      {role === "editor" && (
        <Alert>
          <p className="font-bold">Important</p>
          <p>
            Keep this URL safe, this enables you to edit the exhibit in future
          </p>
        </Alert>
      )}
      <div className="pb-4">
        Anyone on the Internet with this link can
        <select
          className="text-blue-600"
          defaultValue={role}
          onChange={(event: React.FormEvent<HTMLSelectElement>) => {
            const role: Role = event.currentTarget.value as Role;
            setRole(role);
          }}
        >
          {Array.from(roles).map((r: RoleAction) => {
            const [key, value] = r;
            return (
              <option key={key} value={key}>
                {value!.verb}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex pb-4">
        <CopyText id="url" text={urlToCopy()} />
      </div>
      <div className="pt-4 pb-4">
        Use the following code to embed this Exhibit at
        <select
          className="text-blue-600"
          defaultValue={role}
          onChange={(event: React.FormEvent<HTMLSelectElement>) => {
            const size: Size = sizes[Number(event.currentTarget.value)];
            setSize(size);
          }}
        >
          {sizes.map((size: Size, index: number) => {
            const { width, height } = size;
            return (
              <option key={index} value={index}>
                {`${width} x ${height}`}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex">
        <CopyText id="embed" text={embedCodeToCopy()} />
      </div>
    </div>
  );
};

export default Share;
