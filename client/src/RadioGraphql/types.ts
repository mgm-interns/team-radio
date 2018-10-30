import { MutationFn, MutationProps, MutationResult, QueryProps, QueryResult } from "react-apollo";

export interface PartialQueryProps<Response, Variables> extends Partial<QueryProps<Response, Variables>> {
    children: QueryChildrenFn<Response, Variables>;
}

export interface PartialMutationProps<Response, Variables> extends Partial<MutationProps<Response, Variables>> {
    children: MutationChildrenFn<Response, Variables>;
}

export type QueryChildrenFn<Response, Variables> = (result: QueryResult<Response, Variables>) => React.ReactNode

export type MutationChildrenFn<Response, Variables> = (mutateFn: MutationFn<Response, Variables>, result: MutationResult<Response>) => React.ReactNode    