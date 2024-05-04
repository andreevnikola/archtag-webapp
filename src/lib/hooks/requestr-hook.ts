import { useState } from "react";
import { ReqError } from "../requestr";

import { Request } from "../requestr";

export function useRequestr<Body, Ret>(req: Request<Body, Ret>) {
  const [res, setRes] = useState<Ret | null>(null);
  const [error, setError] = useState<ReqError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const send = async ({
    body,
    wildCardToParmasMap,
  }: {
    body: Body;
    wildCardToParmasMap?: Map<string, string>;
  }) => {
    setIsLoading(true);

    req.setBody(body);

    if (wildCardToParmasMap) req.setParams(wildCardToParmasMap);

    const data = await req.send();
    setIsLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setRes(data.res);
    }

    return data;
  };

  return { send, res, isLoading, error };
}
