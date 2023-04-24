# Warehouse Modeling Frontend

A simple demo app that let's you configure the layout of warehouse shelves.
Potentially can be used to build a digital twin of your warehouse with navigation, storage history etc.

### [Live Demo](https://zhabinsky.github.io/warehouse-modeling-frontend/) 👈

### [YouTube Demo](https://youtu.be/Fv7VZ53C3mo) 👈

<br/>

![Screenshot](https://raw.githubusercontent.com/zhabinsky/warehouse-modeling-frontend/master/screenshot.png)

## Stack

- React
- Typescript
- ThreeJS
- react-three-fiber
- create-react-app
- material-ui
- jotai

## License

MIT License

Copyright (c) 2023 Vladislav Zabinskij

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Disclaimer

I was just prototyping, therefore if you ever use this code:

- Double-check how build works, it just ignores a lot of type errors caused by mui+r3f type conflicts (weird bug :P).
- Ideally double-check whether project structure is ok, I'd say it could be tidier (components are scattered, e.g. shelf related components could be grouped)
- Refactor Shelf3D slightly to use InstancedMesh, current solution is quicker, but won't perform when you build shelves with large quantities of shelves
