import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

export type PageProps = RouteComponentProps & {
  id?: string;
  editable: boolean;
  params: any;
  query: any;
  locationState: any;
  pushTo(params?: PushProps): void;
};

type OwnProps = {
  id?: string;
};

type PushProps = {
  path?: string;
  query?: any;
  state?: any;
};

export default function <T extends PageProps>(Component: React.ComponentType<T>, ownProps?: OwnProps) {
  const Page: React.FC<RouteComponentProps> = (props) => {
    const {
      location: { search, pathname },
      match,
      history,
    } = props;
    const params: any = match.params;
    const query = queryString.parse(search);
    const locationState = history.location.state;
    const pushTo = (pushProps: PushProps) => {
      history.push({
        pathname: pushProps.path || pathname,
        search: queryString.stringify(pushProps.query || {}, {
          skipNull: true,
        }),
        state: pushProps.state,
      });
    };
    const editable = params.id && match.path.indexOf('edit') > -1;
    return (
      <Component
        {...(props as T)}
        id={params.id || ownProps?.id || undefined}
        editable={editable}
        query={query}
        locationState={locationState}
        params={params}
        pushTo={pushTo}
      />
    );
  };
  return Page;
}
