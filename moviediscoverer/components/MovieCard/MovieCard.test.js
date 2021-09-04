import React from "react";
import { shallow } from "enzyme";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MovieCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
