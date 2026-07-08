# The Wire — Live News (React, class components)

A live headlines dashboard built entirely with React **class components**:
fetching happens in `componentDidMount`, results replace the DOM via
`setState`, and every component ships with `propTypes` + `defaultProps`.

## Features

- **Live fetch on mount** — `NewsBoard` calls the NewsAPI `top-headlines`
  endpoint inside `componentDidMount`.
- **DOM updates via state** — every fetch calls `setState`, which re-renders
  the article grid with the new data.
- **Prev / Next pagination** — buttons are conditionally disabled at the
  first and last page based on `totalResults` from the API.
- **Loader / spinner** — a `Spinner` component is conditionally rendered
  while a page is loading, and swapped for the article grid once data
  arrives.
- **propTypes & defaultProps** — `NewsBoard` and `NewsItem` both declare
  prop contracts and sensible fallbacks (e.g. a placeholder image when
  `urlToImage` is missing).

## Project structure

```
src/
  App.js                  # category switcher, renders NewsBoard
  index.js                # ReactDOM entry point
  components/
    NewsBoard.js           # core class component: fetch + pagination + spinner
    NewsItem.js            # single article card (propTypes/defaultProps)
    Spinner.js             # loading indicator
```

## Setup

1. Get a free API key at https://newsapi.org/register
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and paste your key:
   ```bash
   cp .env.example .env
   ```
4. Start the dev server:
   ```bash
   npm start
   ```
   The app runs at http://localhost:3000

> **Note:** NewsAPI's free tier only allows requests from `localhost`
> during development — it will reject calls from a deployed/live domain
> unless you're on a paid plan. For production, proxy the request through
> your own backend to keep the key private and to bypass the localhost
> restriction.

## How the core pieces fit together

**Fetching (`NewsBoard.js`)**
```js
componentDidMount() {
  this.fetchNews(this.state.page);
}

fetchNews = async (page) => {
  this.setState({ loading: true });
  const response = await fetch(url);
  const data = await response.json();
  this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false, page });
};
```

**Conditional rendering (spinner vs. content)**
```jsx
{loading ? <Spinner /> : <div className="news-grid">{/* articles */}</div>}
```

**Prev / Next, disabled at the boundaries**
```jsx
<button disabled={page <= 1} onClick={this.handlePrevClick}>← Prev</button>
<button disabled={page * pageSize >= totalResults} onClick={this.handleNextClick}>Next →</button>
```

**propTypes + defaultProps**
```js
NewsBoard.propTypes = {
  country: PropTypes.string,
  category: PropTypes.oneOf([...]),
  pageSize: PropTypes.number,
};
NewsBoard.defaultProps = { country: "us", category: "general", pageSize: 12 };
```

## Customizing

- Change categories: edit the `CATEGORIES` array in `App.js`.
- Change country: pass a different `country` prop to `<NewsBoard />` in `App.js`
  (NewsAPI uses ISO 3166-1 codes, e.g. `in`, `gb`, `au`).
- Change page size: pass a different `pageSize` prop.
