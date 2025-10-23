with import <nixpkgs> {};

mkShell {
  buildInputs = [
    act
    nodejs_22
    nodePackages.vercel
  ];
}
