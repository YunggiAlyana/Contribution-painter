# Contribution Painter

> Inspired by [GitHub Painter](https://github.com/mattrltrent/github-painter) by [@mattrltrent](https://github.com/mattrltrent)

Create custom contribution patterns on your GitHub profile with this interactive tool.

## Overview

**Contribution Painter** is a tool that allows you to design a custom contribution graph that appears on your GitHub profile. This project was created as a learning exercise, heavily inspired by the original [GitHub Painter](https://github.com/mattrltrent/github_painter) by Matthew Trent.

While this version was written from scratch with different code, much of the UI layout and core functionality is similar to the original. I acknowledge and appreciate the inspiration and apologize for not crediting it earlier.

![Contribution Painter](https://github.com/YunggiAlyana/Contribution-painter/raw/main/preview.png)

## Features

* Interactive contribution calendar to draw your pattern
* Supports multiple years of contribution history
* Multiple intensity levels for detailed designs
* Keyboard shortcuts for faster drawing
* Generates a bash script to implement your design

## How to Use

1. Visit the [Contribution Painter website](https://yunggialyana.github.io/Contribution-painter)
2. Enter your GitHub repository URL (e.g., `https://github.com/YOUR_USER/YOUR_REPO`)
3. Select the year you want to use
4. Draw on the grid using click & drag
5. Click `"Download script →"`
6. In your terminal, navigate to the download directory
7. Run `chmod +x github_painter.sh && ./github_painter.sh`

## Keyboard Shortcuts

* **Space**: Empty cell (level 0)
* **A**: Light contribution (level 1)
* **S**: Medium contribution (level 2)
* **D**: Strong contribution (level 3)
* **F**: Maximum contribution (level 4)
* **Esc**: Clear board

## Important Notes

* The script pushes commits to the specified repository — use a throwaway repo, not a production one
* Commits should appear in your contribution graph a few minutes after pushing

## Example

Visit [my GitHub profile](https://github.com/YunggiAlyana) to see the kinds of patterns you can make.

## Contributing

Bug reports or feature suggestions are welcome — open an [issue](https://github.com/YunggiAlyana/Contribution-painter/issues) or submit a PR.

## License

This version is for educational and non-commercial use. The original GitHub Painter had no license at the time this was created, and I now acknowledge that means it should not have been reimplemented or distributed without permission. Going forward, I am open to removing or significantly modifying this repo if the original author requests it.

## Disclaimer

This project was created purely for educational purposes, to learn from an inspiring tool. Please use responsibly and respect GitHub’s contribution graph system.
