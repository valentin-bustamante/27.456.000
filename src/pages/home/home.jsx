import { useCallback, useEffect, useEffectEvent, useMemo, useState } from "react";
import { Titulo } from "../../components/titulo/titulo";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MovieForm } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import { ListSection } from "../../components/ListSection/ListSection";
import { Badge } from "../../components/Badge/Badge";
import styles from "./home.module.css";

const nombreProyecto = "etflix";


const initialArreglo = [
  {
    id: 1,
    type: "Película",
    title: "El señor de los anillos: La comunidad del anillo",
    director: "Peter Jackson",
    year: 2001,
    genre: "Fantasía",
    rating: 8.8,
    viewed: false,
  },
  {
    id: 2,
    type: "Serie",
    title: "Stranger Things",
    director: "Los Duffer",
    year: 2016,
    genre: "Ciencia ficción",
    rating: 8.7,
    viewed: false,
  },
  {
    id: 3,
    type: "Película",
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Thriller",
    rating: 8.8,
    viewed: false,
  },
  {
    id: 4,
    type: "Serie",
    title: "Breaking Bad",
    director: "Vince Gilligan",
    year: 2008,
    genre: "Drama",
    rating: 9.5,
    viewed: false,
  },
];



function Home() {
  const [arreglo, setArreglo] = useState(() => {
    const saved = localStorage.getItem("peliculas");
    return saved ? JSON.parse(saved) : initialArreglo;
  });
  const [form, setForm] = useState({
    title: "",
    director: "",
    year: "",
    genre: "Fantasía",
    rating: "",
    type: "Película",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [searchTerm, setSearchTerm] = useState("");

  const resetForm = useCallback(() => {
    setForm({
      title: "",
      director: "",
      year: "",
      genre: "Fantasía",
      rating: "",
      type: "Película",
    });
    setEditingId(null);
  }, []);


  const openAddModal = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const title = form.title.trim();
      const director = form.director.trim();
      const year = parseInt(form.year, 10);
      const rating = Number(form.rating.toString().replace(",", "."));

      if (!title || !director || Number.isNaN(year) || Number.isNaN(rating)) {
        alert("Completa todos los campos con valores válidos.");
        return;
      }

      if (editingId) {
        setArreglo((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  title,
                  director,
                  year,
                  genre: form.genre,
                  rating,
                  type: form.type,
                }
              : item,
          ),
        );
        resetForm();
        setIsModalOpen(false);
        return;
      }

      const nuevoItem = {
        id: Date.now(),
        title,
        director,
        year,
        genre: form.genre,
        rating,
        type: form.type,
        viewed: false,
      };

      setArreglo((prev) => [nuevoItem, ...prev]);
      resetForm();
      setIsModalOpen(false);
    },
    [editingId, form, resetForm],
  );

  const handleToggleViewed = useCallback((id) => {
    setArreglo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, viewed: !item.viewed } : item,
      ),
    );
  }, []);

  const handleEdit = useCallback((item) => {
    setForm({
      title: item.title,
      director: item.director,
      year: item.year,
      genre: item.genre,
      rating: item.rating,
      type: item.type,
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      const confirmed = window.confirm("¿Eliminar esta película o serie?");
      if (!confirmed) {
        return;
      }
      setArreglo((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) {
        resetForm();
        setIsModalOpen(false);
      }
    },
    [editingId, resetForm],
  );

  const handleCancelEdit = useCallback(() => {
    resetForm();
    setIsModalOpen(false);
  }, [resetForm]);

  useEffect(() => {
    localStorage.setItem("peliculas", JSON.stringify(arreglo));
  }, [arreglo]);
  
  

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return arreglo.filter((item) =>
      item.title.toLowerCase().includes(term) ||
      item.director.toLowerCase().includes(term)
    );
  }, [searchTerm, arreglo]);

  const porVer = useMemo(() => filteredItems.filter((item) => !item.viewed), [filteredItems]);
  const vistos = useMemo(() => filteredItems.filter((item) => item.viewed), [filteredItems]);

  // Contadores sobre TODO el catálogo
  const total = useMemo(() => arreglo.length, [arreglo]);
  const vistasCount = useMemo(() => getVistasCount(arreglo), [arreglo]);
  const noVistasCount = useMemo(() => getNoVistasCount(arreglo), [arreglo]);

  function getVistasCount(arr) {
    return arr.filter((item) => item.viewed).length;
  }

  function getNoVistasCount(arr) {
    return arr.filter((item) => !item.viewed).length;
  }

  return (
    <div className={styles.home}>
      <div className="header">
      <img src="../src/assets/logo.png" alt="Logo" className={styles.logo}/>
      <Titulo texto={nombreProyecto} />
        </div>


      <Button
        type="button"
        variant="ghost"
        size="large"
        className={styles.addCard}
        onClick={openAddModal}
      >
        <div className={styles.addCardBody}>
          <div className={styles.addIcon}>+</div>
          <div>
            <div className={styles.addTitle}>Agregar nueva película o serie</div>
            <div className={styles.addSubtitle}>Haz clic para abrir el formulario</div>
          </div>
        </div>
      </Button>

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por titulo o director..."
      />

      {/* Contadores */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <Badge variant="default">Total: {total}</Badge>
        <Badge variant="viewed">Vistas: {vistasCount}</Badge>
        <Badge variant="notViewed">No vistas: {noVistasCount}</Badge>
      </div>

      <ListSection
        title="Por ver"
        items={porVer}
        emptyText="No hay contsetenido por ver."
        onToggleViewed={handleToggleViewed}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ListSection
        title="Vistos"
        items={vistos}
        emptyText="No hay contenido visto."
        onToggleViewed={handleToggleViewed}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCancelEdit}>
          <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
            <MovieForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isEditing={Boolean(editingId)}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
