# GitHub Painter

Create custom contribution patterns on your GitHub profile with this interactive tool.

## Overview

GitHub Painter allows you to design a custom contribution graph that will appear on your GitHub profile. Simply draw your desired pattern on the interactive calendar grid, and the tool will generate a script that creates the necessary commits to bring your art to life.

![GitHub Painter](https://github.com/YunggiAlyana/Contribution-painter/raw/main/preview.png)

## Features

- Interactive contribution calendar to draw your pattern
- Supports multiple years of contribution history
- Multiple intensity levels for detailed designs
- Keyboard shortcuts for faster drawing
- Generates an executable bash script to implement your design

## How to Use

1. Visit the [Contribution Painter website](https://github.com/YunggiAlyana/Contribution-painter)
2. Enter your GitHub repository URL as `https://github.com/YOUR_USER_NAME/YOUR_REPO_NAME`
3. Select the year you want to use
4. Start drawing with click & drag on the graph
5. Click `"Download script →"`
6. Go to the directory in your terminal where you downloaded the script
7. Run `chmod +x github_painter.sh && ./github_painter.sh`

## Keyboard Shortcuts

- **Space**: Empty cell (level 0)
- **A**: Light contribution (level 1)
- **S**: Medium contribution (level 2)
- **D**: Strong contribution (level 3)
- **F**: Maximum contribution (level 4)
- **Esc**: Clear board

## Important Notes

- The script will push changes to the specified repository, so make sure you have proper permissions
- Consider using a dedicated repository for this purpose rather than an important project repository
- The generated commits will appear in your contribution graph within a few minutes after pushing

## Example

Check out [this example profile](https://github.com/YunggiAlyana) to see what kind of patterns you can create.

## Contributing

Found a bug or have an idea for improvement? Open an [issue](https://github.com/YunggiAlyana/Contribution-painter/issues) or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This tool is created for artistic and educational purposes. Please use responsibly and be mindful of GitHub's terms of service.
