import { getDictionary } from "./dictionaries";

export default async function Home({ params: { lang } }) {
  const dictionary = await getDictionary(lang);

  console.log("dictionary--->", dictionary);

  return (
    <div>
      Welcome
      {dictionary.hello}
    </div>
  );
}
