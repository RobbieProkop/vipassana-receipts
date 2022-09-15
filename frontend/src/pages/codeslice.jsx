//temporary key for google places input
let tempkey = Math.round(Math.random() * 1000000000000000);

<div>
  {suggestions.map((suggestion, index) => {
    const className = suggestion.active ? "select-active" : null;
    return (
      <div
        key={index}
        {...getSuggestionItemProps(suggestion, {
          className,
        })}
      >
        {suggestion.description}
      </div>
    );
  })}
</div>;
