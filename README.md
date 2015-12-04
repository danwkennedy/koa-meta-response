# KOA Response Metadata

KOA middleware that formats responses with a metadata section for adding additional metadata about the request/response.

## Installation

`` npm install koa-meta-response ``

## Usage

When a request is received, the middleware will add a 'meta' object to the context's state. Subsequent middleware can simply add fields to this object. For example, profiler middleware could add profiler information in the metadata or if the resource was loaded from the cache instead of the database, you could set a 'fromCache' flag to true.

When a response is output, the body of the response is transposed to the 'response' field. Hence, this middleware should play well with generic KOA applications that use ``this.body`` to pass the response.
