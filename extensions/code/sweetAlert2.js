(function (Scratch) {
  // This extension was made by ddededodediamante, sweetalert2 was not.
  // Visit SweetAlert2 on sweetalert2.github.io

  (async function () {
    let localStorage = window.localStorage;
    var sweetalert2 = localStorage.getItem('sweetalert2');

    if (!sweetalert2 || sweetalert2 === '') {
      window.alert(
        'This extension requires a package, it will only be installed one time. (21.4 kB)'
      );

      let response = await fetch(
        'https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js'
      );
      if (!response.ok)
        return window.alert(
          'There was an error while fetching a package, please make sure you have internet connection.'
        );

      let code = await response.text();

      localStorage.setItem('sweetalert2', code);
      sweetalert2 = code;
    }

    const script = document.createElement('script');
    script.textContent = sweetalert2;
    script.id = 'sweetAlertScript';
    document.body.appendChild(script);
  })();

  let speechURI =
    'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0OC4zMzU4OCIgaGVpZ2h0PSIzNS41NDQ2MSIgdmlld0JveD0iMCwwLDQ4LjMzNTg4LDM1LjU0NDYxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE2LjA4MjA2LC0xNjIuNTQyMzUpIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMTguMDg3MDksMTc3LjE4NjYxYy0wLjE5NDYyLC05LjU3NzA5IDUuMzA1MjEsLTEyLjY0NDI2IDkuNDQ3NjgsLTEyLjY0NDI2YzUuMDQwOTcsMCAxNi4yMDAzMSwtMC4yOTA5NSAyNC43OTEyOCwwYzQuMTk0OTYsMC4xNDIwNyAxMC4yODg5OSwzLjMyMjY1IDEwLjA4NywxMi42NDQyNmMtMC4xOTExNiw4LjgyMTkyIC02Ljk5ODU4LDExLjUwNzcgLTEwLjE1ODAzLDExLjUwNzdjLTIuODc2LDAgLTcuNjg1MDgsMCAtMTMuMTQxNTEsMGMtMS40NDI2NiwwIC01LjQ4Mzg2LDcuNjE0OTIgLTEyLjA3NTk4LDcuMzg3NjZjLTQuNjc1NDMsLTAuMTYxMTggMi42NTc3MywtNy4zODc2NiAwLjc4MTM5LC03LjM4NzY2Yy01LjU2NDA2LDAgLTkuNTk2MzYsLTQuODQyMjEgLTkuNzMxODIsLTExLjUwNzd6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MjMuOTE3OTM4NDcxODgxNjgzOjE3LjQ1NzY0NzQ0MDgxNzE0LS0+';
  let starURI =
    'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MS43NDU2OCIgaGVpZ2h0PSI0OS40MTAxMiIgdmlld0JveD0iMCwwLDUxLjc0NTY4LDQ5LjQxMDEyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE0LjEyNzE2LC0xNTUuMjk0OTQpIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yNDAsMTU3LjI5NDk0bDcuMjk3MTMsMTUuMDU1OGwxNi41NzU3MSwyLjI4OThsLTEyLjA2Mzc0LDExLjU5NDI0bDIuOTQ0MzIsMTYuNDcwMjdsLTE0Ljc1MzQxLC03Ljg5MTk2bC0xNC43NTU0LDcuODkxOTZsMi45NDYzMSwtMTYuNDcwMjdsLTEyLjA2Mzc0LC0xMS41OTQyNGwxNi41NzU3MSwtMi4yODk4eiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjI1Ljg3MjgzODA1OTcwMTQ4OjI0LjcwNTA1ODM5Nzk0Nzc5NS0tPg==';
  let resetURI =
    'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0OC44NTgxOSIgaGVpZ2h0PSI0Ni43ODc4NSIgdmlld0JveD0iMCwwLDQ4Ljg1ODE5LDQ2Ljc4Nzg1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE1LjU3MDkxLC0xNTYuNjA2MDcpIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yNTcuODk3NDYsMTg5Ljk2NjI0Yy0xLjYyMDg5LDMuMDg1ODggLTQuMDIwNDUsNS44MTgzNyAtNy4xMzMzMSw3Ljg3Njg1Yy05Ljg1NDQ3LDYuNTE2NTggLTIzLjEyNTgyLDMuODEwNyAtMjkuNjQyNCwtNi4wNDM3N2MtNi41MTY1OCwtOS44NTQ0NyAtMy44MTA3LC0yMy4xMjU4MiA2LjA0Mzc3LC0yOS42NDI0YzkuODU0NDcsLTYuNTE2NTggMjMuMTI1ODIsLTMuODEwNyAyOS42NDI0MSw2LjA0Mzc3YzAuMzc1NSwwLjU2Nzg0IDAuNzIwMzgsMS4xNDcwMiAxLjAzNTAzLDEuNzM1NiIvPjxwYXRoIGQ9Ik0yNTIuNTEwNDMsMTg5LjMxNDUzbDcuMTYxNzEsLTMuNjM3ODlsMi43NTY5Niw2LjE2NDUiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoyNC40MjkwOTQ3NjQ2NTk2NTI6MjMuMzkzOTI2MzAxNjYxMzY3LS0+';
  let cogURI =
    'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MS4zNTQzMyIgaGVpZ2h0PSI1MS4zNTQzMyIgdmlld0JveD0iMCwwLDUxLjM1NDMzLDUxLjM1NDMzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE0LjMyMjgzLC0xNTQuMzIyODIpIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTI0Mi45MjEwOSwxNTYuNTcyODJsMi45MjEwOSw2Ljk1MjJjMC41MjU4LDAuMjMzNjkgMS4xMTAwMiwwLjUyNTggMS42MzU4MSwwLjc1OTQ4bDYuOTUyMiwtMi45MjEwOWw0LjIwNjM4LDQuMjA2MzhsLTIuOTIxMDksNi45NTIyYzAuMjkyMTEsMC41MjU4IDAuNTg0MjIsMS4xMTAwMiAwLjc1OTQ4LDEuNjM1ODFsNi45NTIyLDIuOTIxMDl2NS44NDIxOWwtNi45NTIyLDIuOTIxMDljLTAuMjMzNjksMC41MjU4IC0wLjUyNTgsMS4xMTAwMiAtMC43NTk0OCwxLjYzNTgxbDIuOTIxMDksNi45NTIybC00LjIwNjM4LDQuMjA2MzhsLTYuOTUyMiwtMi45MjEwOWMtMC41MjU4LDAuMjkyMTEgLTEuMTEwMDIsMC41MjU4IC0xLjYzNTgxLDAuNzU5NDhsLTIuOTIxMDksNi45NTIyaC01Ljg0MjE5bC0yLjkyMTA5LC02Ljk1MjJjLTAuNTg0MjIsLTAuMjMzNjkgLTEuMTEwMDIsLTAuNTI1OCAtMS42MzU4MSwtMC43NTk0OGwtNi45NTIyLDIuOTIxMDlsLTQuMjA2MzgsLTQuMjA2MzhsMi45MjEwOSwtNi45NTIyYy0wLjI5MjExLC0wLjU4NDIyIC0wLjUyNTgsLTEuMDUxNTkgLTAuNzU5NDgsLTEuNjM1ODFsLTYuOTUyMiwtMi45MjEwOXYtNS44NDIxOWw2Ljk1MjIsLTIuOTIxMDljMC4yMzM2OSwtMC41ODQyMiAwLjQ2NzM4LC0xLjA1MTU5IDAuNzU5NDgsLTEuNjM1ODFsLTIuOTIxMDksLTYuOTUyMmw0LjIwNjM4LC00LjIwNjM4bDYuOTUyMiwyLjkyMTA5YzAuNTI1OCwtMC4yOTIxMSAxLjA1MTU5LC0wLjU4NDIyIDEuNjM1ODEsLTAuNzU5NDhsMi45MjEwOSwtNi45NTIyek0yMzEuMjM2NzIsMTc5Ljk0MTU4YzAsNC44NDkwMiAzLjkxNDI3LDguNzYzMjggOC43NjMyOCw4Ljc2MzI4YzQuODQ5MDIsMCA4Ljc2MzI4LC0zLjkxNDI3IDguNzYzMjgsLTguNzYzMjhjMCwtNC44NDkwMiAtMy45MTQyNywtOC43NjMyOCAtOC43NjMyOCwtOC43NjMyOGMtNC44NDkwMiwwIC04Ljc2MzI4LDMuOTE0MjcgLTguNzYzMjgsOC43NjMyOHoiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoyNS42NzcxNjcxNzcxNzc0MToyNS42NzcxNzcxNzcxNzc2Ny0tPg==';
  let jsonURI =
    'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Ni4wMDU5OSIgaGVpZ2h0PSI0Ni4wMDYiIHZpZXdCb3g9IjAsMCw0Ni4wMDU5OSw0Ni4wMDYiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTYuOTk3MDEsLTE1Ni45OTcpIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMzEuOTkxMTIsMTYwLjc2OTQ5Yy0wLjc0NDczLC0wLjAwNDg1IC0xLjQ4MTQ3LDAuMTUzNDkgLTIuMTU4NDUsMC40NjM4OWMtMi4wNTQ5MSwwLjkwNTg5IC0zLjM3NTg4LDIuOTQ1MzIgLTMuMzYyMjcsNS4xOTEwMWMwLDAuODc0MTEgMC4wMTUzNCwxLjc0MDU2IDAuMDQ2MDEsMi41OTkzNGMwLjAzMDY3LDAuODU4NzggMC4wMzA2NywxLjcwOTg5IDAsMi41NTMzM2MtMC4wMTUzNCwwLjgzMTk0IC0wLjA4NDM0LDEuNjQ4NTUgLTAuMjEwODYsMi40NTM2NWMtMC4xMjY1MiwwLjgwMTI3IC0wLjMzNzM4LDEuNTcxODcgLTAuNjQ0MDgsMi4zMDc5N2MtMC41OTc3OCwxLjQ1MjA1IC0xLjU3NTAyLDIuNzE2NjQgLTIuODI5MzcsMy42NjEzMWMxLjI1Mjk0LDAuOTQ1MTcgMi4yMjg4MywyLjIwOTcxIDIuODI1NTQsMy42NjEzMWMwLjMwNTkzLDAuNzUwMTggMC41MjIxMiwxLjUzMzg4IDAuNjQ0MDgsMi4zMzQ4YzAuMTI2OSwwLjgxMjAzIDAuMTk3MzUsMS42MzE4OCAwLjIxMDg2LDIuNDUzNjVjMC4wMzA2NywwLjgyNDI3IDAuMDMwNjcsMS42NzUzOSAwLDIuNTQ5NWMtMC4wMzA2NywwLjgzOTYxIC0wLjA0MjE3LDEuNzAyMjIgLTAuMDQyMTcsMi41NzYzNGMwLDAuNzc4MjcgMC4xMzgwMiwxLjUwNjcgMC40MjE3MiwyLjE5Njc5YzAuMjkwNTksMC42NTk2MSAwLjY5MTE3LDEuMjY1MDQgMS4xODQ2NSwxLjc5MDRjMC41MDgzMywwLjUwNzYgMS4xMDEyMiwwLjkyMjc1IDEuNzUyMDYsMS4yMjY4M2MwLjY3NDc1LDAuMjk1MjEgMS4zOTE2OCwwLjQ0MDg5IDIuMTU4NDUsMC40NDA4OWgwLjM0NTA1djMuNzcyNDloLTAuMzQxMjFjLTEuMjAzODIsMCAtMi4zNjU0OCwtMC4yMzc3IC0zLjQ4ODc5LC0wLjcwOTI2Yy0xLjEyMzMxLC0wLjQ3MTU2IC0yLjExNjI4LC0xLjE1MDE1IC0yLjk3MTIyLC0yLjAzMTkzYy0wLjg1NDk0LC0wLjg3Nzk1IC0xLjQ4NzUzLC0xLjg0MDI0IC0xLjg5MzkxLC0yLjg4Njg4di0wLjAwMzgzYy0wLjM3NTcyLC0xLjAxOTggLTAuNjI4NzUsLTIuMDc0MSAtMC43NTUyNywtMy4xNTkwOHYtMC4wMDM4M2MtMC4xMDczNSwtMS4wOTI2NCAtMC4xMzgwMiwtMi4yMDA2MiAtMC4wOTIwMSwtMy4zMzU0NGMwLjA0NjAxLC0xLjEwNzk4IDAuMDY5MDEsLTIuMjE5NzkgMC4wNjkwMSwtMy4zMzE2YzAsLTAuNzU5MSAtMC4xNDk1MiwtMS40Nzk4NiAtMC40NDg1NiwtMi4xNjk5NWwtMC4wMDM4MywtMC4wMDc2N2MtMC4yODM3LC0wLjY5MDA5IC0wLjY3ODU5LC0xLjI4NDMzIC0xLjE3Njk5LC0xLjc4MjczbC0wLjAwNzY3LC0wLjAwNzY3Yy0wLjQ4MzA2LC0wLjUxMzczIC0xLjA2MTk3LC0wLjkyMDEyIC0xLjc0NDM5LC0xLjIxOTE2bC0wLjAwMzgzLC0wLjAwMzgzYy0wLjY3NDc1LC0wLjMxMDU0IC0xLjM4NDAxLC0wLjQ2Mzg5IC0yLjEzMTYxLC0wLjQ2Mzg5aC0wLjM0NTA1di0zLjc3MjQ5aDAuMzQxMjFjMC43MzYwNCwwLjAwMzg5IDEuNDY0NzUsLTAuMTQ2MyAyLjEzOTI4LC0wLjQ0MDg5YzEuMzIyNzksLTAuNjAwMzkgMi4zNzAyMywtMS42Nzc5NSAyLjkzMjg4LC0zLjAxNzIzdi0wLjAwMzgzYzAuMjk1MjEsLTAuNjg2MjYgMC40NDg1NiwtMS40MTQ2OCAwLjQ0ODU2LC0yLjE5Mjk1YzAsLTEuMTA3OTggLTAuMDIzLC0yLjIxOTc5IC0wLjA2OTAxLC0zLjMzMTZjLTAuMDQ3NzcsLTEuMTAzNjUgLTAuMDE3MDIsLTIuMjA5MyAwLjA5MjAxLC0zLjMwODZ2LTAuMDA3NjdjMC4xMjM4OCwtMS4wODc0MSAwLjM3ODc2LC0yLjE1NTg1IDAuNzU5MSwtMy4xODIwOHYtMC4wMDM4M2MwLjQyNzI3LC0xLjA4MDc1IDEuMDcwMzksLTIuMDYzMDUgMS44OTAwOCwtMi44ODY4OGMwLjg0MjI3LC0wLjg3MTkxIDEuODUzMTksLTEuNTYzMjUgMi45NzEyMiwtMi4wMzE5M2MxLjEyMzMxLC0wLjQ3MTU2IDIuMjg0OTYsLTAuNzA5MjYgMy40ODQ5NSwtMC43MDkyNmgwLjM0NTA1djMuNzcyNDl6TTI0OC4wMDg4NywxOTkuMjMwNTFjMC43NDQ3MywwLjAwNDg1IDEuNDgxNDcsLTAuMTUzNDkgMi4xNTg0NSwtMC40NjM4OWMyLjA1NDIzLC0wLjkwNjY4IDMuMzc0ODcsLTIuOTQ1NjIgMy4zNjIyNywtNS4xOTEwMWMwLC0wLjg3NDExIC0wLjAxNTM0LC0xLjc0MDU2IC0wLjA0NjAxLC0yLjU5OTM0Yy0wLjAzMDk5LC0wLjg1MDgzIC0wLjAzMDk5LC0xLjcwMjUgMCwtMi41NTMzM2MwLjAxNTM0LC0wLjgzMTk0IDAuMDg0MzQsLTEuNjQ4NTUgMC4yMTA4NiwtMi40NTM2NWMwLjEyNDI1LC0wLjc5MTc0IDAuMzQwNDEsLTEuNTY2MjkgMC42NDQwOCwtMi4zMDc5N2MwLjU5Nzk0LC0xLjQ1MTk2IDEuNTc1MTUsLTIuNzE2NTEgMi44MjkzNywtMy42NjEzMWMtMS4yNTQyMiwtMC45NDQ4IC0yLjIzMTQzLC0yLjIwOTM1IC0yLjgyOTM3LC0zLjY2MTMxYy0wLjMwMjg3LC0wLjczOTkzIC0wLjUxNzU3LC0xLjUxNDM2IC0wLjY0NDA4LC0yLjMzNDhjLTAuMTI2NTIsLTAuNzg1OTQgLTAuMTk1NTMsLTEuNjAyNTQgLTAuMjEwODYsLTIuNDUzNjVjLTAuMDMwNjcsLTAuODI0MjcgLTAuMDMwNjcsLTEuNjc1MzkgMCwtMi41NDk1YzAuMDMwNjcsLTAuODQzNDQgMC4wNDIxNywtMS43MDIyMiAwLjA0MjE3LC0yLjU3NjM0YzAsLTAuNzc4MjcgLTAuMTM4MDIsLTEuNTA2NyAtMC40MjE3MiwtMi4xOTY3OWMtMC4zMDI4NywtMC42Nzg1OSAtMC42OTc3NiwtMS4yNzY2NyAtMS4xODQ2NSwtMS43OTA0Yy0wLjUwMjIzLC0wLjUwNjA3IC0xLjA4NDk3LC0wLjkxMjQ1IC0xLjc1MjA2LC0xLjIyNjgzYy0wLjY3MDkyLC0wLjI5NTIxIC0xLjM4Nzg1LC0wLjQ0MDg5IC0yLjE1NDYxLC0wLjQ0MDg5aC0wLjM0NTA1di0zLjc3MjQ5aDAuMzM3MzhjMS4xOTg3OSwtMC4wMDA1OSAyLjM4NTM4LDAuMjQwNjQgMy40ODg3OSwwLjcwOTI2YzEuMTE3OTcsMC40Njg3NyAyLjEyODg5LDEuMTYwMTEgMi45NzEyMiwyLjAzMTkzYzAuODIxMDcsMC44MjM0OCAxLjQ2NTUxLDEuODA1OCAxLjg5MzkxLDIuODg2ODh2MC4wMDM4M2MwLjM3NzQyLDEuMDE4OTYgMC42MzA5OSwyLjA3OTYgMC43NTUyNywzLjE1OTA4djAuMDAzODNjMC4xMDkwOSwxLjEwODI2IDAuMTM5ODQsMi4yMjI4NSAwLjA5MjAxLDMuMzM1NDRjLTAuMDQ2MDEsMS4xMDc5OCAtMC4wNjkwMSwyLjIxOTc5IC0wLjA2OTAxLDMuMzMxNmMtMC4wMDEyNywwLjc0Njg2IDAuMTUyNzksMS40ODU4MiAwLjQ1MjM5LDIuMTY5OTV2MC4wMDc2N2MwLjI3MDI5LDAuNjY2MzggMC42NzAzOCwxLjI3MjM3IDEuMTc2OTksMS43ODI3M2wwLjAwNzY3LDAuMDA3NjdjMC40OTI2LDAuNTIwNjcgMS4wODYxNCwwLjkzNTUgMS43NDQzOSwxLjIxOTE2bDAuMDAzODMsMC4wMDM4M2MwLjY3NDc1LDAuMzEwNTQgMS4zODQwMSwwLjQ2Mzg5IDIuMTM1NDUsMC40NjM4OWgwLjM0NTA1djMuNzcyNDloLTAuMzQxMjFjLTAuNzM2LC0wLjAwMzQ0IC0xLjQ2NDYxLDAuMTQ2NzIgLTIuMTM5MjgsMC40NDA4OWMtMS4zMjMyNCwwLjU5OTc2IC0yLjM3MDg3LDEuNjc3NTIgLTIuOTMyODgsMy4wMTcyM3YwLjAwMzgzYy0wLjI5NTIxLDAuNjg2MjYgLTAuNDQ4NTYsMS40MTQ2OCAtMC40NDg1NiwyLjE5Mjk1YzAsMS4xMDc5OCAwLjAyMywyLjIxOTc5IDAuMDY5MDEsMy4zMzE2YzAuMDQ2MDEsMS4xMzQ4MSAwLjAxNTM0LDIuMjM1MTMgLTAuMDkyMDEsMy4zMDg2djAuMDA3NjdjLTAuMTI2NTIsMS4xMDAzMSAtMC4zNzU3MiwyLjE2MjI4IC0wLjc1OTEsMy4xODIwOHYwLjAwMzgzYy0wLjQwMjU1LDEuMDQ2NjQgLTEuMDM1MTQsMi4wMDUxIC0xLjg5MDA4LDIuODg2ODhjLTAuODU0OTQsMC44ODE3OCAtMS44NDc5MSwxLjU2MDM3IC0yLjk3MTIyLDIuMDMxOTNjLTEuMTIzMzEsMC40NzE1NiAtMi4yODQ5NiwwLjcwOTI2IC0zLjQ4NDk1LDAuNzA5MjZoLTAuMzQ1MDV2LTMuNzcyNDl6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MjMuMDAyOTk0OTk5OTk5OTQ6MjMuMDAyOTk5OTk5OTk5OTg2LS0+';

  class extension {
    constructor() {
      this.defaultConfig = {
        title: 'Title',
        text: 'Description',
        icon: null,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        denyButtonText: 'No',
        showConfirmButton: true,
        showCancelButton: false,
        showDenyButton: false,
        allowEscapeKey: true,
        allowOutsideClick: true,
        animation: true
      };

      this.globalConfig = { ...this.defaultConfig };

      this.result = {
        inputText: '',
        confirmed: false,
        denied: false,
        dismissed: false,
      };
    }

    getInfo() {
      return {
        id: 'ddeSweetAlert2',
        name: 'Sweet Alerts',
        menuIconURI:
          'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1OC41NDUzNyIgaGVpZ2h0PSI1OC41NDUzNyIgdmlld0JveD0iMCwwLDU4LjU0NTM3LDU4LjU0NTM3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjEwLjcyNzMxLC0xNTAuNzI3MzEpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMTAuNzI3MzEsMTgwYzAsLTE2LjE2Njg2IDEzLjEwNTgzLC0yOS4yNzI2OSAyOS4yNzI2OSwtMjkuMjcyNjljMTYuMTY2ODYsMCAyOS4yNzI2OSwxMy4xMDU4MyAyOS4yNzI2OSwyOS4yNzI2OWMwLDE2LjE2Njg2IC0xMy4xMDU4MywyOS4yNzI2OSAtMjkuMjcyNjksMjkuMjcyNjljLTE2LjE2Njg2LDAgLTI5LjI3MjY5LC0xMy4xMDU4MyAtMjkuMjcyNjksLTI5LjI3MjY5eiIgZmlsbD0iI2FlNjRkYSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTIxNy44MzcwOCwxNzYuOTM2NjFjLTAuMTk0NjIsLTkuNTc3MDkgNS4zMDUyMSwtMTIuNjQ0MjYgOS40NDc2OCwtMTIuNjQ0MjZjNS4wNDA5NywwIDE2LjIwMDMxLC0wLjI5MDk1IDI0Ljc5MTI4LDBjNC4xOTQ5NiwwLjE0MjA3IDEwLjI4ODk5LDMuMzIyNjUgMTAuMDg3LDEyLjY0NDI2Yy0wLjE5MTE2LDguODIxOTIgLTYuOTk4NTgsMTEuNTA3NyAtMTAuMTU4MDMsMTEuNTA3N2MtMi44NzYsMCAtNy42ODUwOCwwIC0xMy4xNDE1MSwwYy0xLjQ0MjY2LDAgLTUuNDgzODYsNy42MTQ5MiAtMTIuMDc1OTgsNy4zODc2NmMtNC42NzU0MywtMC4xNjExOCAyLjY1NzczLC03LjM4NzY2IDAuNzgxMzksLTcuMzg3NjZjLTUuNTY0MDYsMCAtOS41OTYzNiwtNC44NDIyMSAtOS43MzE4MiwtMTEuNTA3N3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoyOS4yNzI2ODY0MTc5MTA1MDY6MjkuMjcyNjg2NDE3OTEwNTM1LS0+',
        color1: '#ae64da',
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Display Alerts',
          },
          {
            opcode: 'showAlert',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show alert',
            blockIconURI: speechURI,
          },
          {
            opcode: 'inputAlert',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show input with default: [DEFAULT] placeholder: [PLACEHOLDER]',
            arguments: {
              DEFAULT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Default',
              },
              PLACEHOLDER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
            },
            blockIconURI: speechURI,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Alert Information',
          },
          {
            opcode: 'getInputValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get input answer',
            disableMonitor: true,
            blockIconURI: starURI,
          },
          {
            opcode: 'getAlertStatus',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get alert status',
            disableMonitor: true,
            blockIconURI: starURI,
          },
          {
            opcode: 'getAlertResult',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'was alert [RESULT]?',
            arguments: {
              RESULT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'RESULT',
              },
            },
            blockIconURI: starURI,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Alert Settings',
          },
          {
            opcode: 'setIcon',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set icon to [ICON]',
            arguments: {
              ICON: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ICON',
              },
            },
            blockIconURI: cogURI,
          },
          {
            opcode: 'setConfig',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [CONFIG] to [VALUE]',
            arguments: {
              CONFIG: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CONFIG',
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
            },
            blockIconURI: cogURI,
          },
          { // Removed for security reasons ↓
            opcode: 'setCustomHTML',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set custom HTML to [VALUE]',
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<b>HTML</b>',
              },
            },
            blockIconURI: cogURI,
            hideFromPalette: true,
          },
          '---',
          {
            opcode: 'exportSettingsJson',
            blockType: Scratch.BlockType.REPORTER,
            text: 'export settings as JSON',
            disableMonitor: true,
            blockIconURI: jsonURI,
          },
          {
            opcode: 'importSettingsJson',
            blockType: Scratch.BlockType.COMMAND,
            text: 'import settings from JSON [CONFIG]',
            arguments: {
              CONFIG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{}',
              },
            },
            blockIconURI: jsonURI,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Reset Settings',
          },
          {
            opcode: 'resetConfig',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset [CONFIG] to default',
            arguments: {
              CONFIG: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CONFIG',
              },
            },
            blockIconURI: resetURI,
          },
          {
            opcode: 'resetAllConfig',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset all settings to default',
            blockIconURI: resetURI,
          },
        ],
        menus: {
          ICON: {
            acceptReporters: true,
            items: ['success', 'info', 'question', 'warning', 'error', 'none'],
          },
          RESULT: {
            acceptReporters: true,
            items: ['confirmed', 'dismissed', 'denied'],
          },
          CONFIG: {
            acceptReporters: true,
            items: Object.keys(this.globalConfig)
              .filter((i) => i !== 'icon')
              .map((v) => {
                return {
                  value: v,
                  text: `${v} (${typeof this.globalConfig[v]})`,
                };
              }),
          },
        },
      };
    }

    async showAlert() {
      const result = await Swal.fire(this.globalConfig);

      this.result.inputText = result.value;
      this.result.confirmed = result.isConfirmed;
      this.result.denied = result.isDenied;
      this.result.dismissed = result.isDismissed;
    }

    async inputAlert(args) {
      const result = await Swal.fire({
        input: 'text',
        inputPlaceholder: args.PLACEHOLDER,
        inputValue: args.DEFAULT,
        ...this.globalConfig,
      });

      this.result.inputText = result.value;
      this.result.confirmed = result.isConfirmed;
      this.result.denied = result.isDenied;
      this.result.dismissed = result.isDismissed;
    }

    getInputValue() {
      return this.result.inputText ?? '';
    }

    getAlertStatus() {
      if (this.result.confirmed === true) return 'confirmed';
      if (this.result.denied === true) return 'denied';
      if (this.result.dismissed === true) return 'dismissed';
      else return 'unknown';
    }

    getAlertResult(args) {
      if (this.result[args.RESULT] === null) return false;
      return this.result[args.RESULT];
    }

    setIcon(args) {
      if (args.ICON === 'none') this.globalConfig.icon = null;
      this.globalConfig.icon = args.ICON;
    }

    setConfig(args) {
      if (!(args.CONFIG in this.globalConfig))
        throw new Error('Invalid configuration');

      let config = this.globalConfig[args.CONFIG];
      let type = typeof config;
      let value;

      if (type === 'boolean') value = Scratch.Cast.toBoolean(args.VALUE);
      else if (type === 'number') value = Scratch.Cast.toNumber(args.VALUE);
      else if (type === 'string') value = Scratch.Cast.toString(args.VALUE);

      this.globalConfig[args.CONFIG] = value;
    }

    setCustomHTML(args) {
      let value = Scratch.Cast.toString(args.VALUE);
      this.globalConfig['html'] = value;
    }

    resetConfig(args) {
      if (!(args.CONFIG in this.globalConfig))
        throw new Error('Invalid configuration');
      this.globalConfig[args.CONFIG] = this.defaultConfig[args.CONFIG];
    }

    resetAllConfig() {
      this.globalConfig = { ...this.defaultConfig };
    }

    exportSettingsJson() {
      return JSON.stringify(this.globalConfig ?? {});
    }

    importSettingsJson(args) {
      try {
        const settings = JSON.parse(args.CONFIG ?? '{}');
        this.globalConfig = { ...this.defaultConfig, ...settings };
      } catch (error) {
        throw new Error('Invalid JSON provided');
      }
    }
  }

  Scratch.extensions.register(new extension());
})(Scratch);
