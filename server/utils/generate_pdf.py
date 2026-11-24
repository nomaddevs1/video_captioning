import logging
from weasyprint import HTML, CSS

from .render_template import render_template

PAGE_MARGIN_CSS = CSS(string="@page { margin: 1in; }")


def render_html(data: dict) -> str:
    logging.info("rendering html document to convert to pdf file...")
    html_str = render_template("transcript.html", **data)

    return html_str


def generate_pdf(html_data: str):
    logging.info("generating pdf file...")
    return HTML(string=html_data).write_pdf(stylesheets=[PAGE_MARGIN_CSS])
