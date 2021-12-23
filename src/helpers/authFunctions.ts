import axios, { AxiosRequestConfig, Method } from "axios";

export interface IApiRequest<T> {
  data: T;
}

interface IUrlWithArgs {
  url: string;
  args: {
    [key: string]: string;
  };
}

export interface IHandleRequest {
  url: string | IUrlWithArgs;
  headers?: object | null;
  body?: object | null;
  type?: Method;
}

export const handleRequest = async <T>({
  url,
  headers = null,
  body = null,
  type = "GET",
}: IHandleRequest): Promise<T> => {
  let base = "https://api.spotify.com";

  if (typeof url === "object") {
    let newUrl = url.url;
    const args = url.args;
    Object.keys(args).forEach((argument) => {
      newUrl = newUrl.replace(`{${argument.toString()}}`, args[argument]);
    });
    url = newUrl;
  }

  url = url.match(/https?:\/\//g) ? url : `${base}${url}`;

  let config = <AxiosRequestConfig>{
    method: type,
    url: url,
    timeout: 100000000,
  };

  if (headers) {
    config.headers = {
      ...headers,
    };
  }

  if (body) {
    config = {
      ...config,
      data: JSON.stringify(body),
    };
  }

  return axios.request<T>(config).then((res: IApiRequest<T>) => {
    const { data } = res;
    return data;
  });
};
