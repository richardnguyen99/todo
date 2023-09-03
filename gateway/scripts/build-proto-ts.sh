#!/bin/bash

BASEDIR=$(dirname "$0")

PROTO_SOURCE=${BASEDIR}/../src/services/proto
PROTO_DEST=${BASEDIR}/../src/services/
BIN_DIR=${BASEDIR}/../node_modules/.bin/grpc_tools_node_protoc_plugin

npx grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DEST} \
    --grpc_out=grpc_js:${PROTO_DEST} \
    -I ${PROTO_SOURCE} \
    ${PROTO_SOURCE}/*.proto

protoc \
    --plugin=protoc-gen-ts=node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${PROTO_DEST} \
    -I ${PROTO_SOURCE} \
    ${PROTO_SOURCE}/*.proto
