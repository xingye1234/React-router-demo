import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useRef, useEffect } from "react";
import { getContacts, createContact } from "../contact";

export interface Contact {
  id: string | number;
  first: string;
  last: string;
  favorite: string;
}

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);

  return { contacts, q };
}

export async function action({ request }: any) {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const inputVal = useRef<HTMLInputElement>(null);
  const navigation = useNavigation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  const submit = useSubmit();

  useEffect(() => {
    inputVal.current!.value = q;
  }, [q]);

  function handleChangeForm(e: any) {
    // e.currentTarget.form 其实就是整个表单，通过submit函数之后会自动提交表单
    const isFirstSearch = q == null;
    submit(e.currentTarget.form, {
      replace: !isFirstSearch,
    });
  }

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              ref={inputVal}
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? "loading" : ""}
              onChange={(e) => {
                handleChangeForm(e);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit" name="type" value="create">
              New
            </button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact: Contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        {navigation.state === "loading" ? "loading" : <Outlet />}
      </div>
    </>
  );
}
