import { readme_html } from "./landing_to_html.ts";

function Search() {
  return (
    <>
      <div id="search" />
    </>
  );
}

function H2(props) {
  return <h2 class="text-4xl font-extrabold mb-4">{props.text}</h2>;
}

function P(props) {
  return (
    <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
      {props.text}
    </p>
  );
}

function ReadMore(props) {
  return (
    <>
      <a
        href={props.href}
        class="inline-flex items-center text-lg text-orange-600 dark:text-orange-500 hover:underline"
      >
        Read more
        <svg
          class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </>
  );
}

function Header() {
  return (
    <header>
      <nav class="bg-white border-gray-200 pr-4">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://emoji2svg.deno.dev/api/%E2%9A%BD"
              class="h-8"
              alt="Haru logo"
            />
            <span class="self-center text-4xl sm:text-2xl font-semibold whitespace-nowrap">
              Haru
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
	  <Search />
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white bg-gray-800 md:bg-gray-900 border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-white text-4xl sm:text-2xl bg-orange-700 rounded md:bg-transparent md:text-orange-700 md:p-0 text-white md:text-orange-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-gray-900 text-4xl sm:text-2xl rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 md:hover:text-orange-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Haru
      </h1>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl ">
        Simple and flexible static site generator(SSG)
      </p>
      <div class="pt-4">
        <a
          href="#kickoff"
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:ring-orange-300"
        >
          Kickoff
          <img
            src="https://emoji2svg.deno.dev/api/%E2%9A%BD"
            class="h-5 pl-3"
            alt="Haru logo"
          />
        </a>
      </div>
    </>
  );
}

function Content() {
  return (
    <>
      <div class="mx-auto max-w-md mt-16">
        <div
          dangerouslySetInnerHTML={{ __html: readme_html }}
          className="prose lg:prose-xl"
        />
      </div>
    </>
  );
}

function Layout({ children }) {
  return (
    <div className="mx-auto max-w-md">
      {children}
    </div>
  );
}

export default function () {
  return (
    <>
      <Header />
      <Layout> 
        <Hero />
        <Content />
      </Layout>
    </>
  );
}
