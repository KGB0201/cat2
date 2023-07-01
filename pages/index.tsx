import { Inter } from "next/font/google";

import { useState } from "react";
import { GetServerSideProps } from "next";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUlr: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  //console.log(result[0]);
  return result[0];
};

const inter = Inter({ subsets: ["latin"] });

export default function Home({ initialCatImageUlr }: IndexPageProps) {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUlr);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>猫画像アプリ</h1>
      {isLoading ? (
        <Loader active />
      ) : (
        <img src={catImageUrl} width={500} height="auto"></img>
      )}
      <button style={{ marginTop: 18 }} onClick={handleClick}>
        今日の猫さん
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUlr: catImage.url,
    },
  };
};
