export function TextIcon(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="1em"
        height="1em"
        {...props}
        color="	#C8C8C8"
      >
        <defs>
          <mask id="ipSFileText0">
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            >
              <path
                fill="#fff"
                stroke="#fff"
                d="M10 44h28a2 2 0 0 0 2-2V14H30V4H10a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2"
              ></path>
              <path stroke="#fff" d="m30 4l10 10"></path>
              <path stroke="#000" d="M24 22v14m-6-14h12"></path>
            </g>
          </mask>
        </defs>
        <path
          fill="currentColor"
          d="M0 0h48v48H0z"
          mask="url(#ipSFileText0)"
        ></path>
      </svg>
    )
  }
  