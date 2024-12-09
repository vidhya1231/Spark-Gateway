import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faWindowClose } from '@fortawesome/free-solid-svg-icons';
const RightSidebar = () => {
  return (
    <div className="col-12 col-lg-3 bg-light" style={{ maxWidth: '360px', paddingTop: '56px' }}>
      <div className="p-3 mt-4">
        <h5 className="text-muted">Sponsored</h5>
        <ul className="list-unstyled">
          <li className="dropdown-item my-2 d-flex">
            {/* Image for the sponsor */}
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt="sponsor"
              className="rounded me-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            {/* Text Content */}
            <div className="d-flex flex-column">
              <p className="m-0 fw-bold">LoremIpsum</p>
              <span className="text-muted fs-7">loremipsum.com</span>
              <span className="text-muted fs-7">2 hours ago · 5 min read</span>
            </div>
            {/* Dropdown Menu */}
            <div className="dropdown ms-auto">
              <button
                className="btn btn-link text-muted p-0"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item d-flex align-items-start">
                  <FontAwesomeIcon icon={faWindowClose} className="me-2" />
                  <div>
                    <p className="m-0">Hide Ad</p>
                    <span className="text-muted fs-7">Never see this ad again</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-3 mt-4">
        <h5 className="text-muted"></h5>
        <ul className="list-unstyled">
          <li className="dropdown-item my-2 d-flex">
            {/* Image for the sponsor */}
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt="sponsor"
              className="rounded me-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            {/* Text Content */}
            <div className="d-flex flex-column">
              <p className="m-0 fw-bold">LoremIpsum</p>
              <span className="text-muted fs-7">loremipsum.com</span>
              <span className="text-muted fs-7">6 hours ago · 10 min read</span>
            </div>
            {/* Dropdown Menu */}
            <div className="dropdown ms-auto">
              <button
                className="btn btn-link text-muted p-0"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item d-flex align-items-start">
                  <FontAwesomeIcon icon={faWindowClose} className="me-2" />
                  <div>
                    <p className="m-0">Hide Ad</p>
                    <span className="text-muted fs-7">Never see this ad again</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-3 mt-4">
        <h5 className="text-muted"></h5>
        <ul className="list-unstyled">
          <li className="dropdown-item my-2 d-flex">
            {/* Image for the sponsor */}
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt="sponsor"
              className="rounded me-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            {/* Text Content */}
            <div className="d-flex flex-column">
              <p className="m-0 fw-bold">LoremIpsum</p>
              <span className="text-muted fs-7">loremipsum.com</span>
              <span className="text-muted fs-7">12 hours ago · 5 min read</span>
            </div>
            {/* Dropdown Menu */}
            <div className="dropdown ms-auto">
              <button
                className="btn btn-link text-muted p-0"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item d-flex align-items-start">
                  <FontAwesomeIcon icon={faWindowClose} className="me-2" />
                  <div>
                    <p className="m-0">Hide Ad</p>
                    <span className="text-muted fs-7">Never see this ad again</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="p-3 mt-4">
        <h5 className="text-muted"></h5>
        <ul className="list-unstyled">
          <li className="dropdown-item my-2 d-flex">
            {/* Image for the sponsor */}
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt="sponsor"
              className="rounded me-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            {/* Text Content */}
            <div className="d-flex flex-column">
              <p className="m-0 fw-bold">LoremIpsum</p>
              <span className="text-muted fs-7">loremipsum.com</span>
              <span className="text-muted fs-7">24 hours ago · 30 min read</span>
            </div>
            {/* Dropdown Menu */}
            <div className="dropdown ms-auto">
              <button
                className="btn btn-link text-muted p-0"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li className="dropdown-item d-flex align-items-start">
                  <FontAwesomeIcon icon={faWindowClose} className="me-2" />
                  <div>
                    <p className="m-0">Hide Ad</p>
                    <span className="text-muted fs-7">Never see this ad again</span>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

  );
};

export default RightSidebar;
