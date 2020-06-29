/**
 * @license
 *
 * Copyright GitLab B.V. and Ben Aubin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
function checkPixelInImageDataArray(pixelOffset, imageDataArray) {
    // `4 *` because RGBA
    const indexOffset = 4 * pixelOffset;
    const hasColor = imageDataArray[indexOffset + 0] ||
        imageDataArray[indexOffset + 1] ||
        imageDataArray[indexOffset + 2];
    const isVisible = imageDataArray[indexOffset + 3];
    // Check for some sort of color other than black
    if (hasColor && isVisible) {
        return true;
    }
    return false;
}
// We use 16px because mobile Safari (iOS 9.3) doesn't properly scale emojis :/
// See 32px, https://i.imgur.com/htY6Zym.png
// See 16px, https://i.imgur.com/FPPsIF8.png
const fontSize = 16;
function ifEmoji(emojiUnicode) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx == null)
        return false;
    canvas.width = 2 * fontSize;
    canvas.height = fontSize;
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "middle";
    //ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
    ctx.fillText(emojiUnicode, 0, fontSize / 2);
    const imageData = ctx.getImageData(0, fontSize / 2, 2 * fontSize, 1).data;
    let validEmoji = false;
    // Sample along the vertical-middle for a couple of characters
    for (let currentPixel = 0; currentPixel < 64; currentPixel += 1) {
        const isLookingAtFirstChar = currentPixel < fontSize;
        const isLookingAtSecondChar = currentPixel >= fontSize + fontSize / 2;
        // Check for the emoji somewhere along the row
        if (isLookingAtFirstChar &&
            checkPixelInImageDataArray(currentPixel, imageData)) {
            validEmoji = true;
            // Check to see that nothing is rendered next to the first character
            // to ensure that the ZWJ sequence rendered as one piece
        }
        else if (isLookingAtSecondChar &&
            checkPixelInImageDataArray(currentPixel, imageData)) {
            return false;
        }
    }
    return validEmoji;
}

export default ifEmoji;
