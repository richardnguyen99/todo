import typing

from flask import Flask, make_response, jsonify


def create_app(
    test_config: typing.Mapping[str, typing.Any] | None = None
) -> Flask:
    """Application factory function that creates a Flask instance app.

    Args:
        test_config (t.Mapping[str  |  t.Any] | None, optional): Optional
        configuration dicitionary. Defaults to None

    Returnscode
        Flask: A Flask instance app.
    """

    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    @app.route("/")
    def ping():
        response = make_response(jsonify({"message": "pong!"}), 200)

        response.headers["X-Content-Type-Options"] = "nosniff"
        response.status_code = 200

        return response

    return app
