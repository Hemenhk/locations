import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreatePostForm from "../posts/CreatePostForm";

test("renders CreatePostForm", () => {
  render(
    <BrowserRouter>
      <CreatePostForm />
    </BrowserRouter>
  );
});

test("renders title, price, contact, content, image fields", () => {
  render(
    <BrowserRouter>
        <CreatePostForm />
    </BrowserRouter>
  );

  const titleField = screen.getByLabelText(/title/i)
  const priceField = screen.getByLabelText(/price/i);
  const contactField = screen.getByLabelText(/contact/i)
  const contentField = screen.getByLabelText(/content/i);
  const imageField = screen.getByTestId("image-test");

  expect(titleField).toBeInTheDocument();
  expect(priceField).toBeInTheDocument()
  expect(contactField).toBeInTheDocument()
  expect(contentField).toBeInTheDocument()
  expect(imageField).toBeInTheDocument()
});

test("renders title, price, contact, content, image fields with empty fields", () => {
    render(
      <BrowserRouter>
          <CreatePostForm />
      </BrowserRouter>
    );
  
    const emptyTitle = screen.getByLabelText(/title/i)
    const emptyPrice = screen.getByLabelText(/price/i);
    const emptyContact = screen.getByLabelText(/contact/i)
    const emptyContent = screen.getByLabelText(/content/i);
    const emptyImage = screen.getByTestId("image-test");
        
    expect(emptyTitle.value).toBe("")
    expect(emptyPrice.value).toBe("")
    expect(emptyContact.value).toBe("")
    expect(emptyContent.value).toBe("")
    expect(emptyImage.value).toBe("")
    
  });


  test("title, price, contact, content, image fields ought to be changed", () => {
    render(
      <BrowserRouter>
          <CreatePostForm />
      </BrowserRouter>
    );
  
    const titleField = screen.getByLabelText(/title/i)
    const priceField = screen.getByLabelText(/price/i);
    const contactField = screen.getByLabelText(/contact/i)
    const contentField = screen.getByLabelText(/content/i);
    const imageField = screen.getByTestId("image-test");

    const testValue = "test";
    
    fireEvent.change(titleField, {target:{value:testValue}})
    fireEvent.change(priceField, {target:{value:testValue}})
    fireEvent.change(contactField, {target:{value:testValue}})
    fireEvent.change(contentField, {target:{value:testValue}})


    expect(titleField.value).toBe(testValue);
    expect(priceField.value).toBe(testValue);
    expect(contactField.value).toBe(testValue);
    expect(contentField.value).toBe(testValue);
    
  });